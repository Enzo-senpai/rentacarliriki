// Admin Dashboard Management
let users = JSON.parse(localStorage.getItem("users")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check admin authentication
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "../admin/admin-login.html";
    return;
  }

  initAdminDashboard();
  initSearchFunctionality();
  initModalFunctionality();
  initLogoutFunctionality();
});

// Initialize Admin Dashboard
function initAdminDashboard() {
  updateStatistics();
  displayUsers();
  displayBookings();
}

// Update Statistics
function updateStatistics() {
  const totalUsers = users.length;
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (booking) => booking.status === "active"
  ).length;

  // Calculate revenue using actual booking prices
  const revenue = bookings.reduce((total, booking) => {
    return total + (booking.totalCost || 0);
  }, 0);

  document.getElementById("totalUsers").textContent = totalUsers;
  document.getElementById("totalBookings").textContent = totalBookings;
  document.getElementById("activeBookings").textContent = activeBookings;
  document.getElementById("revenue").textContent = `€${revenue}`;
}

// Display Users
function displayUsers(filteredUsers = null) {
  const usersToDisplay = filteredUsers || users;
  const tbody = document.getElementById("usersTableBody");

  if (usersToDisplay.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="9" style="text-align: center; color: #cccccc;">No users found</td></tr>';
    return;
  }

  tbody.innerHTML = usersToDisplay
    .map((user) => {
      const userBookings = bookings.filter(
        (booking) => booking.userId === user.id
      );
      const joinDate = new Date(user.createdAt).toLocaleDateString();

      return `
            <tr>
                <td>
                    <div class="user-profile-pic">
                        ${
                          user.profilePicture
                            ? `<img src="${user.profilePicture}" alt="${user.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
                            : ""
                        }
                        <div class="profile-placeholder" style="${
                          user.profilePicture
                            ? "display: none;"
                            : "display: flex;"
                        }">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                </td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.address || "Not provided"}</td>
                <td>${user.license || "Not provided"}</td>
                <td>${joinDate}</td>
                <td>${userBookings.length}</td>
                <td>
                    <button class="action-btn view-btn" onclick="viewUserDetails('${
                      user.id
                    }')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editUser('${
                      user.id
                    }')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteUser('${
                      user.id
                    }')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    })
    .join("");
}

// Display Bookings
function displayBookings(filteredBookings = null) {
  const bookingsToDisplay = filteredBookings || bookings;
  const tbody = document.getElementById("bookingsTableBody");

  if (bookingsToDisplay.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="9" style="text-align: center; color: #cccccc;">No bookings found</td></tr>';
    return;
  }

  tbody.innerHTML = bookingsToDisplay
    .map((booking) => {
      const user = users.find((u) => u.id === booking.userId);
      const pickupDate = new Date(booking.pickupDate).toLocaleDateString();
      const returnDate = new Date(booking.returnDate).toLocaleDateString();
      const createdDate = new Date(booking.createdAt).toLocaleDateString();
      const totalCost = booking.totalCost || 0;
      const dailyRate = booking.carPrice || 0;

      return `
            <tr>
                <td>${user ? user.name : booking.customerName}</td>
                <td>
                    <strong>${booking.car}</strong><br>
                    <small>€${dailyRate}/day</small>
                </td>
                <td>${pickupDate}</td>
                <td>${returnDate}</td>
                <td>${booking.pickupLocation}</td>
                <td>
                    <span class="status-badge ${booking.status}">${
        booking.status
      }</span>
                </td>
                <td>€${totalCost}</td>
                <td>${createdDate}</td>
                <td>
                    <button class="action-btn view-btn" onclick="viewBookingDetails('${
                      booking.id
                    }')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editBooking('${
                      booking.id
                    }')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteBooking('${
                      booking.id
                    }')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    })
    .join("");
}

// Search Functionality
function initSearchFunctionality() {
  const userSearch = document.getElementById("userSearch");
  const bookingSearch = document.getElementById("bookingSearch");

  if (userSearch) {
    userSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.phone.includes(searchTerm)
      );
      displayUsers(filteredUsers);
    });
  }

  if (bookingSearch) {
    bookingSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filteredBookings = bookings.filter((booking) => {
        const user = users.find((u) => u.id === booking.userId);
        return (
          booking.car.toLowerCase().includes(searchTerm) ||
          booking.pickupLocation.toLowerCase().includes(searchTerm) ||
          booking.status.toLowerCase().includes(searchTerm) ||
          (user && user.name.toLowerCase().includes(searchTerm))
        );
      });
      displayBookings(filteredBookings);
    });
  }
}

// Modal Functionality
function initModalFunctionality() {
  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (event.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Close modal with escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const openModal = document.querySelector(
        '.modal[style*="display: block"]'
      );
      if (openModal) {
        closeModal(openModal.id);
      }
    }
  });
}

// Open modal function
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

// Close modal function
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// View User Details
function viewUserDetails(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const userBookings = bookings.filter((booking) => booking.userId === userId);
  const joinDate = new Date(user.createdAt).toLocaleDateString();

  const content = `
        <div class="user-detail-grid">
            <div class="user-profile-section">
                <div class="user-profile-pic-large">
                    ${
                      user.profilePicture
                        ? `<img src="${user.profilePicture}" alt="${user.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
                        : ""
                    }
                    <div class="profile-placeholder-large" style="${
                      user.profilePicture ? "display: none;" : "display: flex;"
                    }">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <h3>${user.name}</h3>
                <p class="user-email">${user.email}</p>
            </div>
            <div class="user-info-section">
                <div class="info-group">
                    <label>Phone:</label>
                    <span>${user.phone}</span>
                </div>
                <div class="info-group">
                    <label>Address:</label>
                    <span>${user.address || "Not provided"}</span>
                </div>
                <div class="info-group">
                    <label>Driver's License:</label>
                    <span>${user.license || "Not provided"}</span>
                </div>
                <div class="info-group">
                    <label>Joined:</label>
                    <span>${joinDate}</span>
                </div>
                <div class="info-group">
                    <label>Total Bookings:</label>
                    <span>${userBookings.length}</span>
                </div>
            </div>
            <div class="user-bookings-section">
                <h4>Recent Bookings</h4>
                ${
                  userBookings.length > 0
                    ? userBookings
                        .slice(0, 5)
                        .map(
                          (booking) => `
                        <div class="booking-item-small">
                            <div class="booking-info">
                                <strong>${booking.car}</strong>
                                <span>${new Date(
                                  booking.pickupDate
                                ).toLocaleDateString()} - ${new Date(
                            booking.returnDate
                          ).toLocaleDateString()}</span>
                                <span class="booking-price">€${
                                  booking.totalCost || 0
                                }</span>
                            </div>
                            <span class="status-badge ${booking.status}">${
                            booking.status
                          }</span>
                        </div>
                    `
                        )
                        .join("")
                    : "<p>No bookings found</p>"
                }
            </div>
        </div>
    `;

  document.getElementById("userDetailContent").innerHTML = content;
  openModal("userDetailModal");
}

// View Booking Details
function viewBookingDetails(bookingId) {
  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) return;

  const user = users.find((u) => u.id === booking.userId);
  const pickupDate = new Date(booking.pickupDate).toLocaleDateString();
  const returnDate = new Date(booking.returnDate).toLocaleDateString();
  const createdDate = new Date(booking.createdAt).toLocaleDateString();

  // Use actual booking data
  const totalDays =
    booking.totalDays ||
    Math.ceil(
      (new Date(booking.returnDate) - new Date(booking.pickupDate)) /
        (1000 * 60 * 60 * 24)
    );
  const dailyRate = booking.carPrice || 0;
  const totalCost = booking.totalCost || 0;

  const content = `
        <div class="booking-detail-grid">
            <div class="booking-info-section">
                <h3>Booking Information</h3>
                <div class="info-group">
                    <label>Booking ID:</label>
                    <span>${booking.id}</span>
                </div>
                <div class="info-group">
                    <label>Car:</label>
                    <span>${booking.car}</span>
                </div>
                <div class="info-group">
                    <label>Car Type:</label>
                    <span>${booking.carType || "Not specified"}</span>
                </div>
                <div class="info-group">
                    <label>Daily Rate:</label>
                    <span>€${dailyRate}</span>
                </div>
                <div class="info-group">
                    <label>Pickup Date:</label>
                    <span>${pickupDate}</span>
                </div>
                <div class="info-group">
                    <label>Return Date:</label>
                    <span>${returnDate}</span>
                </div>
                <div class="info-group">
                    <label>Duration:</label>
                    <span>${totalDays} days</span>
                </div>
                <div class="info-group">
                    <label>Pickup Location:</label>
                    <span>${booking.pickupLocation}</span>
                </div>
                <div class="info-group">
                    <label>Pickup Time:</label>
                    <span>${booking.pickupTime || "Not specified"}</span>
                </div>
                <div class="info-group">
                    <label>Return Time:</label>
                    <span>${booking.returnTime || "Not specified"}</span>
                </div>
                <div class="info-group">
                    <label>Status:</label>
                    <span class="status-badge ${booking.status}">${
    booking.status
  }</span>
                </div>
                <div class="info-group">
                    <label>Total Cost:</label>
                    <span><strong>€${totalCost}</strong></span>
                </div>
                <div class="info-group">
                    <label>Special Requests:</label>
                    <span>${booking.specialRequests || "None"}</span>
                </div>
                <div class="info-group">
                    <label>Created:</label>
                    <span>${createdDate}</span>
                </div>
            </div>
            <div class="customer-info-section">
                <h3>Customer Information</h3>
                <div class="info-group">
                    <label>Name:</label>
                    <span>${user ? user.name : booking.customerName}</span>
                </div>
                <div class="info-group">
                    <label>Email:</label>
                    <span>${user ? user.email : booking.customerEmail}</span>
                </div>
                <div class="info-group">
                    <label>Phone:</label>
                    <span>${user ? user.phone : booking.customerPhone}</span>
                </div>
                <div class="info-group">
                    <label>License:</label>
                    <span>${booking.customerLicense || "Not provided"}</span>
                </div>
            </div>
        </div>
    `;

  document.getElementById("bookingDetailContent").innerHTML = content;
  openModal("bookingDetailModal");
}

// Edit User
function editUser(userId) {
  // This would open an edit form modal
  alert("Edit user functionality would be implemented here");
}

// Delete User
function deleteUser(userId) {
  if (
    confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    )
  ) {
    users = users.filter((u) => u.id !== userId);
    bookings = bookings.filter((b) => b.userId !== userId);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("bookings", JSON.stringify(bookings));

    updateStatistics();
    displayUsers();
    displayBookings();

    alert("User deleted successfully");
  }
}

// Edit Booking
function editBooking(bookingId) {
  // This would open an edit form modal
  alert("Edit booking functionality would be implemented here");
}

// Delete Booking
function deleteBooking(bookingId) {
  if (
    confirm(
      "Are you sure you want to delete this booking? This action cannot be undone."
    )
  ) {
    bookings = bookings.filter((b) => b.id !== bookingId);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    updateStatistics();
    displayBookings();

    alert("Booking deleted successfully");
  }
}

// Logout Functionality
function initLogoutFunctionality() {
  // Add logout button to navigation
  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    const logoutItem = document.createElement("li");
    logoutItem.className = "nav-item";
    logoutItem.innerHTML = `
            <a href="#" class="nav-link" onclick="adminLogout()">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </a>
        `;
    navMenu.appendChild(logoutItem);
  }
}

function adminLogout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoginTime");
    window.location.href = "../admin/admin-login.html";
  }
}

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.viewUserDetails = viewUserDetails;
window.viewBookingDetails = viewBookingDetails;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.editBooking = editBooking;
window.deleteBooking = deleteBooking;
window.adminLogout = adminLogout;
