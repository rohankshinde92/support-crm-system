import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


function Home() {
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const totalTickets = tickets.length;

const openTickets = tickets.filter(
  (ticket) => ticket.status === "Open"
).length;

const closedTickets = tickets.filter(
  (ticket) => ticket.status === "Closed"
).length;

const inProgressTickets = tickets.filter(
  (ticket) => ticket.status === "In Progress"
).length;

  const fetchTickets = async () => {
    try {
      const response = await API.get("/api/tickets", {
        params: {
          search: search || undefined,
          status: status || undefined,
        },
      });

      

      let filteredTickets = response.data;

      if (selectedDate) {
        filteredTickets = filteredTickets.filter((ticket) => {
          const ticketDate = new Date(ticket.created_at)
            .toISOString()
            .split("T")[0];

          return ticketDate === selectedDate;
        });
      }

      setTickets(filteredTickets);

    } catch (error) {
      console.log(error);
    }
  };
const updateStatus = async (ticketId, newStatus) => {
  try {

    await API.put(`/api/tickets/${ticketId}`, {
      status: newStatus,
    });

    fetchTickets();

  } catch (error) {

    console.log(error);

    alert("Failed to update status");

  }
};

const deleteTicket = async (ticketId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ticket?"
  );

  if (!confirmDelete) return;

  try {

    await API.delete(
      `/api/tickets/${ticketId}`
    );

    fetchTickets();

    alert("Ticket Deleted");

  } catch (error) {

    console.log(error);

    alert("Delete Failed");

  }

};
  useEffect(() => {
    fetchTickets();
  }, [search, status, selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6">

        <h2 className="text-3xl font-bold mb-6">
          Ticket Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-gray-500">
      Total Tickets
    </h3>
    <p className="text-3xl font-bold">
      {totalTickets}
    </p>
  </div>

  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-gray-500">
      Open
    </h3>
    <p className="text-3xl font-bold">
      {openTickets}
    </p>
  </div>

  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-gray-500">
      Closed
    </h3>
    <p className="text-3xl font-bold">
      {closedTickets}
    </p>
  </div>

  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-gray-500">
      In Progress
    </h3>
    <p className="text-3xl font-bold">
      {inProgressTickets}
    </p>
  </div>

</div>

        {/* Search + Filters */}

        <div className="flex flex-wrap gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Ticket ID, Customer Name, Subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded flex-1 min-w-[350px]"
          />

          <select
            className="border p-3 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-3 rounded"
          />

        </div>

        {/* Ticket Table */}

        <div className="bg-white shadow rounded overflow-hidden">

          <table className="w-full border-collapse border border-gray-300">

           <thead>
                <tr className="bg-gray-200">

                  <th className="p-4 border border-gray-300 text-center">
                    Ticket ID
                  </th>

                  <th className="p-4 border border-gray-300 text-center">
                    Customer
                  </th>

                  <th className="p-4 border border-gray-300 text-center">
                    Subject
                  </th>

                  <th className="p-4 border border-gray-300 text-center">
                    Status
                  </th>

                  <th className="p-4 border border-gray-300 text-center">
                    Date
                  </th>

                  <th className="p-4 border border-gray-300 text-center">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

              {tickets.length > 0 ? (

                tickets.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50"
                >

                  <td className="p-4 border border-gray-300 text-center">
                    <Link
                      to={`/ticket/${ticket.ticket_id}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {ticket.ticket_id}
                    </Link>
                  </td>

                  <td className="p-4 border border-gray-300 text-center">
                    {ticket.customer_name}
                  </td>

                  <td className="p-4 border border-gray-300 text-center">
                    {ticket.subject}
                  </td>

                  <td className="p-4 border border-gray-300 text-center">

                    <select
                      value={ticket.status}
                      onChange={(e) =>
                        updateStatus(
                          ticket.ticket_id,
                          e.target.value
                        )
                      }
                      className={
                        ticket.status === "Open"
                          ? "bg-green-100 text-green-700 border rounded p-2"
                          : ticket.status === "Closed"
                          ? "bg-red-100 text-red-700 border rounded p-2"
                          : "bg-yellow-100 text-yellow-700 border rounded p-2"
                      }
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>

                  </td>

                  <td className="p-4 border border-gray-300 text-center">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4 border border-gray-300 text-center">

                    <button
                      onClick={() => deleteTicket(ticket.ticket_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-6"
                  >
                    No tickets found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Home;