export default function WalletBar() {
  const balance = localStorage.getItem("wallet");

  return (
    <div className="bg-green-100 p-4 rounded text-center">
      💰 Wallet Balance: <b>₹{balance}</b>
    </div>
  );
}
