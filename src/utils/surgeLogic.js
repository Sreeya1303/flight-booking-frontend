export function applySurge(flightId, basePrice) {
  let attempts = JSON.parse(localStorage.getItem("attempts")) || {};
  const now = Date.now();

  if (!attempts[flightId]) {
    attempts[flightId] = { count: 1, time: now };
  } else {
    const diff = (now - attempts[flightId].time) / 50000;
    attempts[flightId].count = diff <= 5 ? attempts[flightId].count + 1 : 1;
    attempts[flightId].time = now;
  }

  localStorage.setItem("attempts", JSON.stringify(attempts));
  return attempts[flightId].count >= 3 ? basePrice * 1.1 : basePrice;
}
