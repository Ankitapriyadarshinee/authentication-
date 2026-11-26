const API = "/api/auth";

if (localStorage.getItem("token")) {
  window.location.href = "home.html";
}

const msg = document.getElementById("msg");

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  msg.className = "msg";
  msg.textContent = "Please wait...";

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
    msg.textContent = "Login successful! Redirecting...";
    setTimeout(() => (window.location.href = "home.html"), 700);
  } catch (e) {
    msg.className = "msg error";
    msg.textContent = "Browser error: " + e.message;
  }
});