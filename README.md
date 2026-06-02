# 🚀 Support CRM System

A full-stack Customer Support CRM built with **FastAPI**, **React**, **SQLAlchemy**, and **SQLite**, designed to manage customer support tickets efficiently through a modern web interface.

---

## 🌐 Live Demo

**Frontend (Vercel)**
 https://support-crm-system-self.vercel.app

**Backend API (Railway)**
[Add your Railway URL here](https://support-crm-system-production-52eb.up.railway.app)

**GitHub Repository**
https://github.com/rohankshinde92/support-crm-system

---

## 📌 Features

### 🎫 Ticket Management

* Create Support Tickets
* View All Tickets
* View Ticket Details
* Update Ticket Status
* Delete Tickets

### 🔍 Search & Filter

* Search by Customer Name
* Search by Email
* Search by Ticket ID
* Search by Subject
* Filter by Ticket Status

### 📊 CRM Dashboard

* Centralized Ticket Management
* Real-time Ticket Updates
* Clean and User-Friendly Interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* CSS

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

### Database

* SQLite

### Deployment

* Vercel (Frontend)
* Railway (Backend)

### Version Control

* Git
* GitHub

---

## 📂 Project Structure

```bash
support-crm/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/rohankshinde92/support-crm-system.git
cd support-crm-system
```

---

## ▶️ Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

Swagger Docs:

```bash
http://127.0.0.1:8000/docs
```

---

## ▶️ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| GET    | /                        | Health Check      |
| POST   | /api/tickets             | Create Ticket     |
| GET    | /api/tickets             | Get All Tickets   |
| GET    | /api/tickets/{ticket_id} | Get Single Ticket |
| PUT    | /api/tickets/{ticket_id} | Update Ticket     |
| DELETE | /api/tickets/{ticket_id} | Delete Ticket     |

---

## 🎯 Project Highlights

✅ Full Stack Development

✅ REST API Architecture

✅ CRUD Operations

✅ Search & Filtering

✅ Deployment on Railway & Vercel

✅ GitHub CI/CD Workflow

✅ Responsive User Interface

---

## 🚀 Future Enhancements

* Agent Assignment
* Dashboard Analytics
* Export CSV
* Export Excel
* User Authentication (JWT)
* PostgreSQL Integration
* Email Notifications
* Role-Based Access Control

---

## 👨‍💻 Author

**Rohan shinde**

Post Graduate | Python Developer | Data Engineering Enthusiast

GitHub: https://github.com/rohankshinde92

---

⭐ If you found this project useful, consider giving it a star on GitHub.
