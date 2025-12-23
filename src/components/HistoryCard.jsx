import { generatePDF } from "../utils/pdfGenerator";

export default function HistoryCard({ booking }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">
          ✈ {booking.airline} ({booking.flight_id})
        </h3>
        <span className="text-sm text-gray-500">
          {booking.time}
        </span>
      </div>

      <p className="mt-2">
        📍 {booking.from} → {booking.to}
      </p>

      <p className="mt-1 font-semibold">
        💰 Paid: ₹{booking.price}
      </p>

      <p className="mt-1 text-sm">
        🆔 PNR: <b>{booking.pnr}</b>
      </p>

      <button
      className="bg-blue-600 text-white px-3 py-1 rounded"
      onClick={() =>
      window.open(
      `https://flight-booking-backend-xxxx.onrender.com/api/book/ticket/${b.pnr}`,
      "_blank"
    )
  }
>
  Download Ticket
</button>

    </div>
  );
}
