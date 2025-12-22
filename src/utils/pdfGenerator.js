import jsPDF from "jspdf";

export function generatePDF(booking) {
  const doc = new jsPDF();
  doc.text("Flight Ticket", 20, 20);
  doc.text(`PNR: ${booking.pnr}`, 20, 30);
  doc.text(`Flight: ${booking.airline}`, 20, 40);
  doc.text(`Route: ${booking.from} → ${booking.to}`, 20, 50);
  doc.text(`Price Paid: ₹${booking.price}`, 20, 60);
  doc.save(`${booking.pnr}.pdf`);
}
