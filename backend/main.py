from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, or_
from sqlalchemy.orm import Session
from datetime import datetime

from database import SessionLocal, engine
from models import Base, Ticket
from schemas import TicketCreate, TicketUpdate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


# Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Support CRM Running"}


# CREATE TICKET

@app.post("/api/tickets")
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):

    new_ticket = Ticket(
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    new_ticket.ticket_id = f"TKT-{new_ticket.id:03d}"

    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket_id": new_ticket.ticket_id,
        "created_at": new_ticket.created_at
    }

# GET ALL TICKETS + SEARCH + FILTER
@app.get("/api/tickets")
def get_tickets(
    search: str = None,
    status: str = None,
    db: Session = Depends(get_db)
):

    query = db.query(Ticket)

    if search:
        query = query.filter(
            or_(
                Ticket.customer_name.contains(search),
                Ticket.customer_email.contains(search),
                Ticket.ticket_id.contains(search),
                Ticket.subject.contains(search)
            )
        )

    if status:
        query = query.filter(
            func.lower(Ticket.status) == status.lower()
        )

    tickets = query.all()

    return tickets


# GET SINGLE TICKET
@app.get("/api/tickets/{ticket_id}")
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


# UPDATE TICKET STATUS
@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    ticket_update: TicketUpdate,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    ticket.status = ticket_update.status
    ticket.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)

    return {
        "message": "Ticket updated successfully",
        "ticket_id": ticket.ticket_id,
        "status": ticket.status
    }

@app.delete("/api/tickets/{ticket_id}")
def delete_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    db.delete(ticket)

    db.commit()

    return {
        "message": "Ticket deleted successfully"
    }