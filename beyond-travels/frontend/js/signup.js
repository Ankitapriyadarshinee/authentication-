const API = "/api/auth";
const msg = document.getElementById("msg");

document.getElementById("signupBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  msg.className = "msg";
  msg.textContent = "Please wait...";

  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const data = await res.json();

    if (!data.success) {
      msg.className = "msg error";
      msg.textContent = data.message + (data.reason ? " [" + data.reason + "]" : "");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    msg.className = "msg success";
    msg.textContent = "Signup successful! Redirecting...";
    setTimeout(() => (window.location.href = "home.html"), 700);
  } catch (e) {
    msg.className = "msg error";
    msg.textContent = "Browser error: " + e.message;
  }
});