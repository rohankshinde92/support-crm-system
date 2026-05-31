import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Dashboard */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Create Ticket */}

        <Route
          path="/create-ticket"
          element={<CreateTicket />}
        />

        {/* Ticket Details */}

        <Route
          path="/ticket/:ticketId"
          element={<TicketDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;