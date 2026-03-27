const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

async function load() {
  const res = await fetch("/api/bookings", {
    headers: { "Authorization": token }
  });

  const data = await res.json();

  const table = document.querySelector("tbody");
  table.innerHTML = "";

  data.forEach(b => {
    table.innerHTML += `
      <tr>
        <td>${b.name}</td>
        <td>${b.phone}</td>
        <td>${b.pickup} → ${b.dropoff}</td>
        <td>${b.status}</td>
      </tr>
    `;
  });
}

load();