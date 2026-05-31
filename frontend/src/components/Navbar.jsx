import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Support CRM System
        </h1>

        <div className="flex gap-4">

          <Link
            to="/"
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold"
          >
            Dashboard
          </Link>

          <Link
            to="/create-ticket"
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold"
          >
            Create Ticket
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;