// Admin Login Management
document.addEventListener("DOMContentLoaded", function () {
  // Check if already logged in
  if (localStorage.getItem("adminLoggedIn") === "true") {
    window.location.href = "../admin/admin.html";
    return;
  }

  initLoginForm();
});

// Initialize Login Form
function initLoginForm() {
  const loginForm = document.getElementById("adminLoginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleAdminLogin();
  });

  // Auto-focus username field
  document.getElementById("adminUsername").focus();
}

// Handle Admin Login
function handleAdminLogin() {
  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value;

  // Simple authentication (in production, this should be server-side)
  if (username === "admin" && password === "admin123") {
    // Set admin session
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("adminLoginTime", new Date().toISOString());

    showNotification(
      "Login successful! Redirecting to dashboard...",
      "success"
    );

    // Redirect to admin dashboard
    setTimeout(() => {
      window.location.href = "../admin/admin.html";
    }, 1000);
  } else {
    showNotification(
      "Invalid username or password. Please try again.",
      "error"
    );
    document.getElementById("adminPassword").value = "";
    document.getElementById("adminPassword").focus();
  }
}

// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById("adminPassword");
  const toggleBtn = document.querySelector(".password-toggle i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.className = "fas fa-eye-slash";
  } else {
    passwordInput.type = "password";
    toggleBtn.className = "fas fa-eye";
  }
}

// Show Notification
function showNotification(message, type = "info") {
  const container = document.getElementById("notificationContainer");
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

  container.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Export function for global access
window.togglePassword = togglePassword;
