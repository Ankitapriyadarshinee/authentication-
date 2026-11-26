const API = "/api/auth";
const token = localStorage.getItem("token");

// Token nahi hai to login par bhejo
if (!token) {
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", logout);

document.querySelectorAll(".book").forEach((b) =>
  b.addEventListener("click", () => alert("Booking feature jaldi aa raha hai! 🚀"))
);

// Token se profile mangao (JWT verify hota hai)
async function loadProfile() {
  try {
    const res = await fetch(`${API}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!data.success) {
      logout(); // token galat ya expire
      return;
    }

    const u = data.user;
    document.getElementById("navName").textContent = u.name;
    document.getElementById("userName").textContent = u.name;
    document.getElementById("pName").textContent = u.name;
    document.getElementById("pEmail").textContent = u.email;
    document.getElementById("pPhone").textContent = u.phone;
  } catch (e) {
    alert("Server se connect nahi ho pa raha");
  }
}

loadProfile();