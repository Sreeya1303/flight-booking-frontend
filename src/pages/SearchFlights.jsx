import { useState, useEffect } from "react";
import axios from "axios";
import PaymentModal from "../components/PaymentModal";
import hero from "../assets/hero.jpg";
import API_BASE_URL from "../config/api";

const cities = [
  "Hyderabad","Delhi","Mumbai","Bangalore","Chennai",
  "Kolkata","Pune","Jaipur","Goa","Ahmedabad"
];

export default function SearchFlights() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seat, setSeat] = useState("");
  const [wallet, setWallet] = useState(0);

  // ✅ WALLET FROM BACKEND (NOT LOCAL STORAGE)
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/wallet`)
      .then(res => setWallet(res.data.wallet))
      .catch(() => alert("Backend not reachable"));
  }, []);

  const searchFlights = async () => {
    if (!from || !to) {
      alert("Select both cities");
      return;
    }

    const res = await axios.get(
      `${API_BASE_URL}/api/flights?from=${from}&to=${to}`
    );
    setFlights(res.data);
  };

  const confirmBooking = async () => {
    try {
      if (!seat) {
        alert("Select seat");
        return;
      }

      const price = selectedFlight.base_price;

      await axios.post(`${API_BASE_URL}/api/wallet/deduct`, {
        amount: price
      });

      const res = await axios.post(`${API_BASE_URL}/api/book`, {
        flight_id: selectedFlight.flight_id,
        passenger: "Sreeya",
        seat
      });

      alert(`Booked Successfully!\nPNR: ${res.data.booking.pnr}`);
      window.location.href = "/history";

    } catch {
      alert("Booking failed or wallet insufficient");
    }
  };

  return (
    <>
      <div
        className="h-[350px] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <h1 className="text-4xl font-bold">Book Flights Instantly ✈️</h1>
        <p className="mt-2">Wallet: ₹{wallet}</p>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg max-w-5xl mx-auto -mt-12 flex gap-4">
        <select value={from} onChange={e => setFrom(e.target.value)} className="border p-2 w-full">
          <option value="">From</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>

        <select value={to} onChange={e => setTo(e.target.value)} className="border p-2 w-full">
          <option value="">To</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>

        <button className="bg-blue-600 text-white px-6 rounded" onClick={searchFlights}>
          Search
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-8 space-y-4">
        {flights.map(f => (
          <div key={f.flight_id} className="border p-4 rounded flex justify-between">
            <div>
              <h2 className="font-bold">{f.airline}</h2>
              <p>{f.departure_city} → {f.arrival_city}</p>
              <p className="text-blue-600 font-bold">₹{f.base_price}</p>
            </div>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedFlight(f)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedFlight && (
        <PaymentModal
          flight={{
            airline: selectedFlight.airline,
            from: selectedFlight.departure_city,
            to: selectedFlight.arrival_city,
            price: selectedFlight.base_price
          }}
          seat={seat}
          setSeat={setSeat}
          onClose={() => setSelectedFlight(null)}
          onPay={confirmBooking}
        />
      )}
    </>
  );
}
