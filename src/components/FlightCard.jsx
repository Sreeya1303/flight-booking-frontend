export default function FlightCard({ flight }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <h2 className="font-bold text-lg">
        {flight.airline} ({flight.flight_id})
      </h2>

      <p className="text-sm mt-1">
        {flight.from} → {flight.to}
      </p>

      <p className="font-semibold mt-2">
        ₹{flight.base_price}
      </p>

      <button className="mt-3 bg-blue-600 text-white w-full py-2 rounded">
        Book Now
      </button>
    </div>
  );
}
