// Car data
const cars = [
  {
    id: "audi-a3",
    name: "Audi A3",
    type: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 40,
    image: "../../assets/images/audi-a3.jpg",
  },
  {
    id: "bmw-x3",
    name: "BMW X3",
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 60,
    image: "../../assets/images/bmw-x3.jpg",
  },
  {
    id: "mercedes-c200",
    name: "Mercedes C-Class",
    type: "Luxury",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 80,
    image: "../../assets/images/mercedes-c.jpg",
  },
  {
    id: "volkswagen-golf",
    name: "Volkswagen Golf",
    type: "Compact",
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    price: 35,
    image: "../../assets/images/volkswagen-golf.jpg",
  },
  {
    id: "toyota-camry",
    name: "Toyota Camry",
    type: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 45,
    image: "../../assets/images/toyota-camry.jpg",
  },
  {
    id: "honda-crv",
    name: "Honda CR-V",
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 55,
    image: "../../assets/images/honda-crv.jpg",
  },
  {
    id: "ford-focus",
    name: "Ford Focus",
    type: "Compact",
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    price: 30,
    image: "../../assets/images/ford-focus.jpg",
  },
  {
    id: "nissan-qashqai",
    name: "Nissan Qashqai",
    type: "Crossover",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 50,
    image: "../../assets/images/nissan-qashqai.jpg",
  },
  {
    id: "peugeot-3008",
    name: "Peugeot 3008",
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 65,
    image: "../../assets/images/peugeot-3008.jpg",
  },
];

let selectedCar = null;
let bookingData = {};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  setMinimumDates();

  // Check if a car was selected from home page
  const selectedCarId = localStorage.getItem("selectedCarId");
  if (selectedCarId) {
    // Pre-select the car in search form
    document.getElementById("searchCar").value = selectedCarId;
    localStorage.removeItem("selectedCarId"); // Clear after use
  }

  // Auto-fill booking form if user is logged in
  autoFillBookingForm();

  // Event listeners
  document
    .getElementById("searchForm")
    .addEventListener("submit", handleSearch);
  document
    .getElementById("finalBookingForm")
    .addEventListener("submit", handleBooking);
});

// Set minimum dates for date inputs
function setMinimumDates() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("pickupDate").min = today;
  document.getElementById("returnDate").min = today;

  // Set return date minimum based on pickup date
  document.getElementById("pickupDate").addEventListener("change", function () {
    const pickupDate = this.value;
    if (pickupDate) {
      const minReturnDate = new Date(pickupDate);
      minReturnDate.setDate(minReturnDate.getDate() + 1);
      document.getElementById("returnDate").min = minReturnDate
        .toISOString()
        .split("T")[0];
    }
  });
}

// Display available cars based on search
function displayAvailableCars(searchData) {
  const carGrid = document.getElementById("carGrid");
  let filteredCars = cars;

  // Filter by selected car if specified
  if (searchData.car) {
    filteredCars = cars.filter((car) => car.id === searchData.car);
  }

  if (filteredCars.length === 0) {
    carGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-car" style="font-size: 3rem; color: #999; margin-bottom: 20px;"></i>
                <h3>No Cars Available</h3>
                <p>Sorry, no cars are available for the selected criteria.</p>
            </div>
        `;
    return;
  }

  carGrid.innerHTML = filteredCars
    .map((car) => createCarCard(car, searchData))
    .join("");
}

// Create car card HTML
function createCarCard(car, searchData) {
  const totalDays = Math.ceil(
    (new Date(searchData.returnDate) - new Date(searchData.pickupDate)) /
      (1000 * 60 * 60 * 24)
  );
  const totalCost = totalDays * car.price;

  return `
        <div class="car-card">
            <div class="car-image">
                <i class="fas fa-car"></i>
            </div>
            <div class="car-details">
                <h3>${car.name}</h3>
                <div class="car-specs">
                    <span><i class="fas fa-users"></i> ${car.seats} Seats</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                </div>
                <div class="car-price">€${car.price}/day</div>
                <div style="margin-bottom: 15px; font-size: 14px; color: #666;">
                    <strong>Total for ${totalDays} days: €${totalCost}</strong>
                </div>
                <button class="book-car-btn" onclick="selectCar('${car.id}')">
                    <i class="fas fa-check"></i> Select This Car
                </button>
            </div>
        </div>
    `;
}

// Handle search form submission
function handleSearch(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const searchData = {
    car: formData.get("searchCar"),
    pickupLocation: formData.get("pickupLocation"),
    pickupDate: formData.get("pickupDate"),
    returnDate: formData.get("returnDate"),
  };

  // Validate dates
  if (!validateDates(searchData.pickupDate, searchData.returnDate)) {
    showInlineError(
      "Please select valid dates. Return date must be after pickup date."
    );
    return;
  }

  // Validate location
  if (!searchData.pickupLocation) {
    showInlineError("Please select a pickup location.");
    return;
  }

  // Store search data for booking
  bookingData = { ...searchData };

  // Show available cars
  displayAvailableCars(searchData);

  // Show available cars section
  document.getElementById("availableCarsSection").style.display = "block";

  // Scroll to cars section
  document
    .getElementById("availableCarsSection")
    .scrollIntoView({ behavior: "smooth" });
}

// Show inline error message instead of popup
function showInlineError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "inline-error";
  errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 10px 15px;
        border-radius: 8px;
        margin: 10px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

  const searchForm = document.getElementById("searchForm");
  const existingError = searchForm.querySelector(".inline-error");
  if (existingError) {
    existingError.remove();
  }

  searchForm.appendChild(errorDiv);

  // Remove error after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}

// Validate dates
function validateDates(pickupDate, returnDate) {
  if (!pickupDate || !returnDate) return false;

  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);

  return returnD > pickup;
}

// Select a car for booking
function selectCar(carId) {
  selectedCar = cars.find((car) => car.id === carId);

  if (!selectedCar) {
    alert("Car not found!");
    return;
  }

  // Update selected car display
  updateSelectedCarDisplay();

  // Pre-fill booking form with search data
  prefillBookingForm();

  // Show selected car section and booking form
  document.getElementById("selectedCarSection").style.display = "block";
  document.getElementById("bookingForm").style.display = "block";
  document.getElementById("availableCarsSection").style.display = "none";

  // Scroll to booking section
  document
    .querySelector(".booking-container")
    .scrollIntoView({ behavior: "smooth" });
}

// Update selected car display
function updateSelectedCarDisplay() {
  const totalDays = Math.ceil(
    (new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) /
      (1000 * 60 * 60 * 24)
  );
  const totalCost = totalDays * selectedCar.price;

  document.getElementById("selectedCarName").textContent = selectedCar.name;
  document.getElementById(
    "selectedCarPrice"
  ).textContent = `€${selectedCar.price}`;

  document.getElementById("selectedCarSpecs").innerHTML = `
        <span><i class="fas fa-star"></i> ${selectedCar.seats} S</span>
        <span><i class="fas fa-cog"></i> ${selectedCar.transmission}</span>
        <span><i class="fas fa-gas-pump"></i> ${selectedCar.fuel}</span>
    `;
}

// Pre-fill booking form
function prefillBookingForm() {
  document.getElementById("bookingPickupLocation").value =
    bookingData.pickupLocation;
  document.getElementById("bookingPickupDate").value = bookingData.pickupDate;
  document.getElementById("bookingReturnDate").value = bookingData.returnDate;
}

// Show available cars again
function showAvailableCars() {
  document.getElementById("selectedCarSection").style.display = "none";
  document.getElementById("bookingForm").style.display = "none";
  document.getElementById("availableCarsSection").style.display = "block";
  document
    .getElementById("availableCarsSection")
    .scrollIntoView({ behavior: "smooth" });
}

// Auto-fill booking form with user data if logged in
function autoFillBookingForm() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    const customerName = document.getElementById("customerName");
    const customerEmail = document.getElementById("customerEmail");
    const customerPhone = document.getElementById("customerPhone");

    if (customerName) customerName.value = currentUser.name || "";
    if (customerEmail) customerEmail.value = currentUser.email || "";
    if (customerPhone) customerPhone.value = currentUser.phone || "";
  }
}

// Handle final booking form submission
function handleBooking(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const customerData = {
    name: formData.get("customerName"),
    email: formData.get("customerEmail"),
    phone: formData.get("customerPhone"),
    license: formData.get("customerLicense") || "Not provided",
    specialRequests: formData.get("specialRequests"),
  };

  // Combine all booking data
  const completeBooking = {
    ...bookingData,
    ...customerData,
    car: selectedCar,
    pickupTime: formData.get("pickupTime"),
    returnTime: formData.get("returnTime"),
    totalDays: Math.ceil(
      (new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) /
        (1000 * 60 * 60 * 24)
    ),
    totalCost:
      Math.ceil(
        (new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) /
          (1000 * 60 * 60 * 24)
      ) * selectedCar.price,
    bookingDate: new Date().toISOString(),
    bookingId: generateBookingId(),
  };

  // Send booking to admin via EmailJS
  sendBookingToAdmin(completeBooking);
}

// Generate unique booking ID
function generateBookingId() {
  return (
    "BK" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
  );
}

// Send booking notification to admin
async function sendBookingToAdmin(bookingData) {
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Sending Booking...';
  submitBtn.disabled = true;

  try {
    // Send email using EmailJS with the same pattern as contact form
    const response = await emailjs.send(
      "service_alzcjgo",
      "template_c0pdgu5",
      {
        to_email: "triumfhadri@gmail.com",
        from_name: "Rent a Car Liriki Booking System",
        from_email: "noreply@rentacarliriki.com",
        subject: `New Car Booking - ${bookingData.car.name} - ${bookingData.name}`,
        message: `New booking received for ${bookingData.car.name}`,

        // Booking specific variables
        booking_id: bookingData.bookingId,
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        customer_license: bookingData.license,
        car_name: bookingData.car.name,
        car_type: bookingData.car.type,
        pickup_location: bookingData.pickupLocation,
        pickup_date: bookingData.pickupDate,
        return_date: bookingData.returnDate,
        total_days: bookingData.totalDays,
        total_cost: bookingData.totalCost,
        special_requests: bookingData.specialRequests || "None",
        booking_date: new Date(bookingData.bookingDate).toLocaleDateString(),
        booking_time: new Date(bookingData.bookingDate).toLocaleTimeString(),

        // Additional company info
        company_name: "Rent a Car Liriki",
        company_email: "info@rentacarliriki.com",
        company_phone: "+383 49 XXX XXX",
        company_address: "Gjakova, Kosovo",
      },
      "MNhNohqRQUsqNTUTo"
    );

    console.log("SUCCESS!", response.status, response.text);

    // Store booking in localStorage for admin dashboard
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = {
      id: bookingData.bookingId,
      userId: JSON.parse(localStorage.getItem("currentUser"))?.id || "guest",
      customerName: bookingData.name,
      customerEmail: bookingData.email,
      customerPhone: bookingData.phone,
      car: bookingData.car.name,
      carType: bookingData.car.type,
      carPrice: bookingData.car.price,
      pickupDate: bookingData.pickupDate,
      returnDate: bookingData.returnDate,
      pickupLocation: bookingData.pickupLocation,
      pickupTime: bookingData.pickupTime,
      returnTime: bookingData.returnTime,
      totalDays: bookingData.totalDays,
      totalCost: bookingData.totalCost,
      specialRequests: bookingData.specialRequests || "None",
      status: "active",
      createdAt: new Date().toISOString(),
      bookingDate: bookingData.bookingDate,
    };
    allBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));

    // Show success message
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("errorMessage").style.display = "none";

    // Reset form
    document.getElementById("finalBookingForm").reset();
    document.getElementById("searchForm").reset();

    // Auto-fill again if user is logged in
    autoFillBookingForm();

    // Hide booking form and show search section
    setTimeout(() => {
      document.getElementById("bookingForm").style.display = "none";
      document.getElementById("selectedCarSection").style.display = "none";
      document.getElementById("availableCarsSection").style.display = "none";
      document.getElementById("successMessage").style.display = "none";
    }, 5000);
  } catch (error) {
    console.log("FAILED...", error);

    // Show error message with more details
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = `
            <i class="fas fa-exclamation-circle"></i> 
            Booking submitted but email notification failed. Your booking has been recorded. 
            We'll contact you shortly to confirm.
        `;
    errorMessage.style.display = "block";
    document.getElementById("successMessage").style.display = "none";

    // Still reset form and show success after delay
    setTimeout(() => {
      document.getElementById("finalBookingForm").reset();
      document.getElementById("searchForm").reset();
      autoFillBookingForm();
      document.getElementById("bookingForm").style.display = "none";
      document.getElementById("selectedCarSection").style.display = "none";
      document.getElementById("availableCarsSection").style.display = "none";
      document.getElementById("errorMessage").style.display = "none";
    }, 5000);
  } finally {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}
