import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function TicketDetails() {

  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);

  const fetchTicket = async () => {

    try {

      const response = await API.get(
        `/api/tickets/${ticketId}`
      );

      setTicket(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchTicket();
  }, []);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">

        <h2 className="text-3xl font-bold mb-6">
          Ticket Details
        </h2>

        <div className="space-y-4">

          <p>
            <strong>Ticket ID:</strong>
            {" "}
            {ticket.ticket_id}
          </p>

          <p>
            <strong>Customer:</strong>
            {" "}
            {ticket.customer_name}
          </p>

          <p>
            <strong>Email:</strong>
            {" "}
            {ticket.customer_email}
          </p>

          <p>
            <strong>Subject:</strong>
            {" "}
            {ticket.subject}
          </p>

          <p>
            <strong>Description:</strong>
            {" "}
            {ticket.description}
          </p>

          <p>
            <strong>Status:</strong>
            {" "}
            {ticket.status}
          </p>

          <p>
            <strong>Created:</strong>
            {" "}
            {new Date(
              ticket.created_at
            ).toLocaleString()}
          </p>

        </div>

      </div>

    </div>
  );
}

export default TicketDetails;