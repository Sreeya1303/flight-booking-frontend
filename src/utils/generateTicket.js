import jsPDF from "jspdf";

export function generateTicket(booking) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Flight Ticket", 20, 20);

  doc.setFontSize(12);
  doc.text(`Passenger: Sreeya`, 20, 40);
  doc.text(`Airline: ${booking.airline}`, 20, 50);
  doc.text(`Route: ${booking.route}`, 20, 60);
  doc.text(`Seat: ${booking.seat}`, 20, 70);
  doc.text(`Amount Paid: ₹${booking.amount}`, 20, 80);
  doc.text(`PNR: ${booking.pnr}`, 20, 90);
  doc.text(`Date: ${new Date(booking.date).toLocaleString()}`, 20, 100);

  doc.save(`Ticket-${booking.pnr}.pdf`);
}
