Project Overview

This is the frontend of the Flight Booking Application built using React + Vite.
Users can search flights, view prices, book tickets, manage wallet balance, and download tickets.

The frontend communicates with the backend via REST APIs.

Tech Stack
React (Vite)
Axios
Tailwind CSS
React Router DOM
Netlify (Deployment)

Project Structure
frontend/
│── src/
│   ├── assets/        # Images (hero, icons)
│   ├── components/    # Navbar, PaymentModal, Cards
│   ├── pages/         # SearchFlights, BookingHistory
│   ├── utils/         # PDF generation, surge logic
│   ├── config/        # API base URL
│   ├── App.jsx
│   └── main.jsx
│── public/
│── package.json
│── vite.config.js

Environment Configuration
Create src/config/api.js
const API_BASE_URL = "https://flight-booking-backend-ekjl.onrender.com";
export default API_BASE_URL;

▶️ Run Locally
npm install
npm run dev


App runs at:
http://localhost:5173

🌐 Deployment
Deployed on Netlify
Steps:
Build command: npm run build
Publish directory: dist
Set API base URL to Render backend

✅ Features
Search flights by city
Dynamic pricing display
Wallet balance integration
Ticket booking

Booking history

Ticket PDF download
