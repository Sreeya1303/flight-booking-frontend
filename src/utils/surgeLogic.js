export function applySurge(flightId, basePrice) {
  const attempts = JSON.parse(localStorage.getItem("attempts"));
  const now = Date.now();

  if (!attempts[flightId]) {
    attempts[flightId] = { count: 1, time: now };
  } else {
    const diff = (now - attempts[flightId].time) / 60000;

    if (diff <= 5) attempts[flightId].count += 1;
    else attempts[flightId] = { count: 1, time: now };
  }

  localStorage.setItem("attempts", JSON.stringify(attempts));

  if (attempts[flightId].count >= 3) {
    return basePrice * 1.1; // 10% surge
  }

  return basePrice;
}
