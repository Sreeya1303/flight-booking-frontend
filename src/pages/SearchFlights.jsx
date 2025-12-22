import { useState, useEffect } from "react";
import axios from "axios";
import PaymentModal from "../components/PaymentModal";
import hero from "../assets/hero.jpg";

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

  // ✅ INIT WALLET ONCE
  useEffect(() => {
  const storedWallet = localStorage.getItem("wallet");

  if (storedWallet === null) {
    localStorage.setItem("wallet", 50000);
    setWallet(50000);
  } else {
    setWallet(Number(storedWallet));
  }
}, []);



  const searchFlights = async () => {
    if (!from || !to) {
      alert("Select both cities");
      return;
    }
    const res = await axios.get(
      `http://localhost:5000/api/flights?from=${from}&to=${to}`
    );
    setFlights(res.data);
  };

  const confirmBooking = async () => {
    try {

       if (wallet <= 0) {
      alert("Wallet balance is 0. Cannot book ticket.");
      return;
    }

      if (!seat) {
        alert("Select seat");
        return;
      }

      const price =
        selectedFlight.current_price || selectedFlight.base_price;

      if (wallet < price) {
        alert("Insufficient wallet balance");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/book", {
        flight_id: selectedFlight.flight_id,
        passenger: "Sreeya",
        seat
      });

      // ✅ UPDATE WALLET
      const newWallet = wallet - price;
      setWallet(newWallet);
      localStorage.setItem("wallet", newWallet);

      // ✅ SAVE FULL BOOKING DATA
      const booking = {
        airline: selectedFlight.airline,
        route: `${selectedFlight.departure_city} → ${selectedFlight.arrival_city}`,
        seat,
        amount: price,
        pnr: res.data.booking.pnr,
        date: new Date().toISOString()
      };

      const oldBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      localStorage.setItem(
        "bookings",
        JSON.stringify([booking, ...oldBookings])
      );

      alert(`Booked Successfully!\nPNR: ${booking.pnr}`);
      setSelectedFlight(null);
      setSeat("");
      window.location.href = "/history";

    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <>
      {/* HERO */}
      <div
        className="h-[350px] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <h1 className="text-4xl font-bold">Book Flights Instantly ✈️</h1>
        <p className="mt-2">All Cities • Best Prices</p>
      </div>

      {/* SEARCH */}
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-5xl mx-auto -mt-12 flex gap-4">
        <select className="border p-2 w-full" value={from} onChange={e => setFrom(e.target.value)}>
          <option value="">From</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>

        <select className="border p-2 w-full" value={to} onChange={e => setTo(e.target.value)}>
          <option value="">To</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>

        <button className="bg-blue-600 text-white px-6 rounded" onClick={searchFlights}>
          Search
        </button>
      </div>

      {/* RESULTS */}
      <div className="max-w-5xl mx-auto mt-8 space-y-4">
        {flights.map(f => (
          <div key={f.flight_id} className="border p-4 rounded flex justify-between">
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
          onClose={() => setSelectedFlight(null)}
          onPay={confirmBooking}
        />
      )}
    </>
  );
}
