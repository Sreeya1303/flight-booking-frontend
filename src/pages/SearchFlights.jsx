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

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/wallet`)
      .then(res => setWallet(res.data.wallet))
      .catch(() => alert("Backend not reachable"));
  }, []);

  const searchFlights = async () => {
    const res = await axios.get(
      `${API_BASE_URL}/api/flights?from=${from}&to=${to}`
    );
    setFlights(res.data);
  };

  const confirmBooking = async () => {
    const price = selectedFlight.current_price || selectedFlight.base_price;

    if (wallet < price) {
      alert("Insufficient wallet balance");
      return;
    }

    const bookingRes = await axios.post(`${API_BASE_URL}/api/book`, {
      flight_id: selectedFlight.flight_id,
      passenger: "Sreeya",
      seat
    });

    const walletRes = await axios.post(`${API_BASE_URL}/api/wallet/deduct`, {
      amount: price
    });

    setWallet(walletRes.data.wallet);

    const booking = bookingRes.data.booking;
    const old = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([booking, ...old]));

    alert(`Booked! PNR: ${booking.pnr}`);
    window.location.href = "/history";
  };

  return (
    <>
      <div className="h-[350px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${hero})` }}>
        <h1 className="text-4xl font-bold">Book Flights Instantly ✈️</h1>
      </div>

      <div className="max-w-5xl mx-auto mt-8 space-y-4">
        {flights.map(f => (
          <div key={f.flight_id} className="border p-4 flex justify-between">
            <div>
              <h2>{f.airline}</h2>
              <p>{f.departure_city} → {f.arrival_city}</p>
              <p>₹{f.current_price || f.base_price}</p>
            </div>
            <button onClick={() => setSelectedFlight(f)}>Book</button>
          </div>
        ))}
      </div>

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
