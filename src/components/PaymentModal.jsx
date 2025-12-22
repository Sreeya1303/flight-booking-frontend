export default function PaymentModal({
  flight,
  seat,
  setSeat,
  onClose,
  onPay
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

        <p className="font-semibold">{flight.airline}</p>
        <p>
          {flight.from} → {flight.to}
        </p>
        <p className="text-blue-600 font-bold text-lg">
          ₹{flight.price}
        </p>

        <select
          className="border p-2 w-full mt-4"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        >
          <option value="">Select Seat</option>
          <option value="Window">Window</option>
          <option value="Middle">Middle</option>
          <option value="Aisle">Aisle</option>
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="border px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={onPay}
          >
            Pay & Book
          </button>
        </div>
      </div>
    </div>
  );
}
