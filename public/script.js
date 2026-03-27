document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    phone: phone.value,
    pickup: pickup.value,
    dropoff: dropoff.value,
    date: date.value,
    vehicle: vehicle.value,
    payment: payment.value,
    transactionId: transactionId.value
  };

  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
});