const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://flight-booking-backend-k9xl.onrender.com";

export default API_BASE_URL;
