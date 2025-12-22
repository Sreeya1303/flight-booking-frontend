import { generateTicket } from "../utils/generateTicket";

export default function BookingHistory() {
  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    return <p className="text-center mt-10">No bookings found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">📄 Booking History</h1>

      {bookings.map((b, i) => (
        <div key={i} className="border p-4 rounded shadow">
          <p><b>Airline:</b> {b.airline}</p>
          <p><b>Route:</b> {b.route}</p>
          <p><b>Seat:</b> {b.seat}</p>
          <p><b>Amount:</b> ₹{b.amount}</p>
          <p><b>PNR:</b> {b.pnr}</p>
          <p className="text-sm text-gray-500">
            {new Date(b.date).toLocaleString()}
          </p>

          <button
            className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
            onClick={() => generateTicket(b)}
          >
            Download Ticket
          </button>
        </div>
      ))}
    </div>
  );
}
