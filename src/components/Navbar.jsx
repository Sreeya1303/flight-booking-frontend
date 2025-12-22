import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/wallet")
      .then(res => setWallet(res.data.walletBalance));
  }, []);

  return (
    <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">✈ FlyNow</h1>

      <div className="flex items-center gap-6">
        <Link to="/">Search Flights</Link>
        <Link to="/history">Booking History</Link>
        <div className="bg-white text-blue-600 px-4 py-1 rounded font-bold">
            Wallet: ₹{localStorage.getItem("wallet") || 50000}
        </div>

      </div>
    </div>
  );
}
