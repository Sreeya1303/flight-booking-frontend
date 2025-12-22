import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchFlights from "./pages/SearchFlights";
import BookingHistory from "./pages/BookingHistory";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchFlights />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
