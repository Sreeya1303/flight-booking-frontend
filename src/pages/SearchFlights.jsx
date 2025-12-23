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

  /* 🔥 LOAD WALLET */
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/wallet`)
      .then(res => setWallet(res.data.wallet))
      .catch(err => console.error("Wallet error:", err));
  }, []);

  /* 🔍 SEARCH FLIGHTS (NO ALERTS) */
  const searchFlights = async () => {
    if (!from || !to) return;

    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/flights`,
        { params: { from, to } }
      );

      setFlights(res.data || []);
    } catch (err) {
      console.error("Flight fetch failed:", err);
      setFlights([]); // silently fail
    }
  };

  /* 💳 BOOK FLIGHT */
  const confirmBooking = async () => {
    if (!seat) return;

    const price =
      selectedFlight.current_price || selectedFlight.base_price;

    if (wallet < price) return;

    try {
      const bookingRes = await axios.post(`${API_BASE_URL}/api/book`, {
        flight_id: selectedFlight.flight_id,
        passenger: "Sreeya",
        seat
      });

      const walletRes = await axios.post(
        `${API_BASE_URL}/api/wallet/deduct`,
        { amount: price }
      );

      setWallet(walletRes.data.wallet);

      const booking = bookingRes.data.booking;
      const old = JSON.parse(localStorage.getItem("bookings")) || [];
      localStorage.setItem("bookings", JSON.stringify([booking, ...old]));

      setSelectedFlight(null);
      setSeat("");
      window.location.href = "/history";
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <>
      {/* HERO */}
      <div
        className="h-[350px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <h1 className="text-4xl font-bold">Book Flights Instantly ✈️</h1>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-5xl mx-auto mt-6 flex gap-4">
        <select
          className="border p-2 w-full"
          value={from}
          onChange={e => setFrom(e.target.value)}
        >
          <option value="">From</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={to}
          onChange={e => setTo(e.target.value)}
        >
          <option value="">To</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-6 rounded"
          onClick={searchFlights}
        >
          Search
        </button>
      </div>

      {/* RESULTS */}
      <div className="max-w-5xl mx-auto mt-8 space-y-4">
        {flights.map(f => (
          <div
            key={f.flight_id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h2 className="font-bold">{f.airline}</h2>
              <p>{f.departure_city} → {f.arrival_city}</p>
              <p className="text-blue-600 font-bold">
                ₹{f.current_price || f.base_price}
              </p>
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

      {/* PAYMENT MODAL */}
      {selectedFlight && (
        <PaymentModal
          flight={{
            airline: selectedFlight.airline,
            from: selectedFlight.departure_city,
            to: selectedFlight.arrival_city,
            price: selectedFlight.current_price || selectedFlight.base_price
          }}
          seat={seat}
          setSeat={setSeat}
          onPay={confirmBooking}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </>
  );
}
