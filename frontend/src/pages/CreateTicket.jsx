import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CreateTicket() {

  const [formData, setFormData] = useState({
  customer_name: "",
  customer_email: "",
  subject: "",
  description: "",
});

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/api/tickets", formData);

      alert("Ticket Created Successfully");

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error Creating Ticket");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-2xl mx-auto p-6">

        <h2 className="text-3xl font-bold mb-6">
          Create Ticket
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow"
        >

          <input
            type="text"
            name="customer_name"
            placeholder="Customer Name"
            value={formData.customer_name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="email"
            name="customer_email"
            placeholder="Customer Email"
            value={formData.customer_email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />
          
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            rows="5"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Create Ticket
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTicket;