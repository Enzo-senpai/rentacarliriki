// User Account Management
let currentUser = null;
let users = JSON.parse(localStorage.getItem("users")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
let currentLanguage = localStorage.getItem("language") || "en";

// Language translations
const translations = {
  en: {
    home: "Home",
    about: "About",
    fleet: "Our Fleet",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    editProfile: "Edit Profile",
    bookingHistory: "Booking History",
    welcome: "Welcome to Rent a Car Liriki",
    smartChoices: "Smart Choices, Smart Rides",
    bookNow: "Book a Car Now",
    search: "Search",
    selectArea: "Select Area",
    selectType: "Select Type",
    ourFleet: "Our Fleet",
    chooseFromFleet: "Choose from our diverse selection of vehicles",
    securitySystem: "Security System",
    topSecurity: "Top Security System? Let's Check It Out.",
    whyChooseUs: "Why Choose Us",
    premierChoice: "Your Premier Choice for Stress-Free Travel",
    testimonials: "Testimonials",
    ourCustomersReview: "Our Customers Review",
    contactUs: "Contact Us",
    getInTouch: "Get in touch with us for any inquiries",
    sendMessage: "Send Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    yourMessage: "Your Message",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    agreeTerms: "I agree to the Terms & Conditions",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    signIn: "Sign In",
    bookYourCar: "Book Your Car",
    selectCar: "Select Car",
    pickupDate: "Pickup Date",
    returnDate: "Return Date",
    pickupLocation: "Pickup Location",
    confirmBooking: "Confirm Booking",
    updateProfile: "Update Profile",
    personalInfo: "Update your personal information",
    address: "Address",
    driversLicense: "Driver's License Number",
    profilePicture: "Profile Picture",
    bookingHistoryTitle: "Booking History",
    previousBookings: "Your previous and current bookings",
    totalBranches: "Total Branches",
    happyCustomers: "Happy Customers",
    successRate: "Success Rate %",
    fillAllFields: "Please fill in all fields.",
    passwordsDontMatch: "Passwords do not match.",
    agreeTerms: "Please agree to the terms and conditions.",
    emailExists: "An account with this email already exists.",
    accountCreated: "Account created successfully!",
    loginSuccess: "Login successful!",
    invalidCredentials: "Invalid email or password.",
    profileUpdated: "Profile updated successfully!",
    logoutSuccess: "Logged out successfully!",
    bookingSuccess:
      "Booking submitted successfully! We'll confirm your reservation soon.",
    invalidReturnDate: "Return date must be after pickup date.",
    contactSuccess: "Message sent successfully!",
    contactError: "Failed to send message. Please try again.",
    newsletterSuccess: "Successfully subscribed to newsletter!",
    newsletterAlreadySubscribed:
      "You are already subscribed to our newsletter!",
    security: "Security & Safety",
    premiumVehicles: "Premium Vehicles for Your Journey",
    yourSafety: "Your Safety is Our Priority",
    ourCustomers: "Our Customers Review",
    heroTitle: "Premium Car Rental in Kosovo",
    heroSubtitle: "Experience Luxury & Comfort",
    heroDescription:
      "Discover our premium fleet of vehicles and enjoy exceptional service with Rent a Car Liriki. Your journey starts here.",
    stayUpdated: "Stay Updated",
    newsletterDesc:
      "Subscribe to our newsletter for exclusive offers, car updates, and travel tips!",
    usefulLinks: "Useful Links",
  },
  sq: {
    home: "Kryesore",
    about: "Rreth Nesh",
    fleet: "Flota Jonë",
    contact: "Kontakti",
    login: "Hyrje",
    signup: "Regjistrohu",
    logout: "Dil",
    editProfile: "Redakto Profilin",
    bookingHistory: "Historia e Rezervimeve",
    welcome: "Mirë se vini në Rent a Car Liriki",
    smartChoices: "Zgjedhje të Mençura, Udhëtime të Mençura",
    bookNow: "Rezervo një Makinë Tani",
    search: "Kërko",
    selectArea: "Zgjidh Zonën",
    selectType: "Zgjidh Tipin",
    ourFleet: "Flota Jonë",
    chooseFromFleet: "Zgjidh nga koleksioni ynë i larmishëm i automjeteve",
    securitySystem: "Sistemi i Sigurisë",
    topSecurity: "Sistemi i Sigurisë më i Mirë? Le ta Kontrollojmë.",
    whyChooseUs: "Pse të Na Zgjidhni",
    premierChoice: "Zgjedhja Juaj Kryesore për Udhëtime pa Stres",
    testimonials: "Dëshmi",
    ourCustomersReview: "Vlerësimi i Klientëve Tanë",
    contactUs: "Na Kontaktoni",
    getInTouch: "Na kontaktoni për çdo pyetje",
    sendMessage: "Dërgo Mesazhin",
    yourName: "Emri Juaj",
    yourEmail: "Emaili Juaj",
    subject: "Subjekti",
    yourMessage: "Mesazhi Juaj",
    fullName: "Emri i Plotë",
    phoneNumber: "Numri i Telefonit",
    password: "Fjalëkalimi",
    confirmPassword: "Konfirmo Fjalëkalimin",
    agreeTerms: "Pajtohem me Kushtet dhe Rregullat",
    createAccount: "Krijo Llogari",
    alreadyHaveAccount: "Keni tashmë një llogari?",
    dontHaveAccount: "Nuk keni një llogari?",
    signIn: "Hyr",
    bookYourCar: "Rezervo Makinën Tënde",
    selectCar: "Zgjidh Makinën",
    pickupDate: "Data e Marrjes",
    returnDate: "Data e Kthimit",
    pickupLocation: "Vendndodhja e Marrjes",
    confirmBooking: "Konfirmo Rezervimin",
    updateProfile: "Përditëso Profilin",
    personalInfo: "Përditëso informacionin personal",
    address: "Adresa",
    driversLicense: "Numri i Lejes së Drejtimit",
    profilePicture: "Foto e Profilit",
    bookingHistoryTitle: "Historia e Rezervimeve",
    previousBookings: "Rezervimet tuaja të mëparshme dhe aktuale",
    totalBranches: "Degët Totale",
    happyCustomers: "Klientë të Kënaqur",
    successRate: "Përqindja e Suksesit %",
    fillAllFields: "Ju lutemi plotësoni të gjitha fushat.",
    passwordsDontMatch: "Fjalëkalimet nuk përputhen.",
    agreeTerms: "Ju lutemi pajtohuni me kushtet dhe rregullat.",
    emailExists: "Një llogari me këtë email ekziston tashmë.",
    accountCreated: "Llogaria u krijua me sukses!",
    loginSuccess: "Hyrja u krye me sukses!",
    invalidCredentials: "Email ose fjalëkalim i pavlefshëm.",
    profileUpdated: "Profili u përditësua me sukses!",
    logoutSuccess: "Dilja u krye me sukses!",
    bookingSuccess:
      "Rezervimi u dërgua me sukses! Do të konfirmojmë rezervimin tuaj së shpejti.",
    invalidReturnDate: "Data e kthimit duhet të jetë pas datës së marrjes.",
    contactSuccess: "Mesazhi u dërgua me sukses!",
    contactError: "Dërgimi i mesazhit dështoi. Ju lutemi provoni përsëri.",
    newsletterSuccess: "U abonua me sukses në buletinin tonë!",
    newsletterAlreadySubscribed: "Ju jeni tashmë i abonuar në buletinin tonë!",
    security: "Siguria & Siguria",
    premiumVehicles: "Vetura Premium për Udhëtimin Tuaj",
    yourSafety: "Siguria Juaj është Prioriteti Ynë",
    ourCustomers: "Vlerësimi i Klientëve Tanë",
    heroTitle: "Qira e Makinave Premium në Kosovë",
    heroSubtitle: "Përjetoni Luksin & Komoditetin",
    heroDescription:
      "Zbuloni flotën tonë premium të automjeteve dhe shijoni shërbimin e jashtëzakonshëm me Rent a Car Liriki. Udhëtimi juaj fillon këtu.",
    stayUpdated: "Qëndroni të Përditësuar",
    newsletterDesc:
      "Abonohuni në buletinin tonë për oferta ekskluzive, përditësime të makinave dhe këshilla udhëtimi!",
    usefulLinks: "Lidhje të Dobishme",
  },
};

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");
  // Initialize all functionality
  initNavigation();
  initModals();
  initForms();
  initAnimations();
  initStatistics();
  initSmoothScrolling();
  initUserSystem();
  initLanguageSystem();

  // Force update user interface after a short delay
  setTimeout(() => {
    console.log("Force updating user interface");
    updateUserInterface();
  }, 500);
});

// Navigation functionality
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
    }
  });
}

// Modal functionality
function initModals() {
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
  console.log("Opening modal:", modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    console.log("Modal opened successfully");

    // Add click outside to close functionality
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });
  } else {
    console.log("Modal not found:", modalId);
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

// Switch between login and signup modals
function switchAuth(type) {
  if (type === "signup") {
    closeModal("loginModal");
    openModal("signupModal");
  } else {
    closeModal("signupModal");
    openModal("loginModal");
  }
}

// Form functionality
function initForms() {
  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterForm);
  }

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginForm);
    console.log("Login form event listener attached");
  } else {
    console.log("Login form not found");
  }

  // Signup form
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignupForm);
    console.log("Signup form event listener attached");
  } else {
    console.log("Signup form not found");
  }

  // Booking form
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingForm);
  }

  // Subscribe form
  const subscribeForm = document.querySelector(".subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", handleSubscribeForm);
  }
}

// Handle contact form submission
async function handleContactForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Show loading state
  const submitBtn = event.target.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    async function sendEmail(data) {
      try {
        // Get current timestamp
        const now = new Date();
        const submissionTime = now.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        });

        const response = await emailjs.send(
          "service_rk9xvu9",
          "template_k8h43gd",
          {
            to_email: "triumfhadri@gmail.com",
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            submission_time: submissionTime,
            // Additional fields for better email template
            customer_name: data.name,
            customer_email: data.email,
            inquiry_subject: data.subject,
            inquiry_message: data.message,
            company_name: "Rent a Car Liriki",
            company_email: "info@rentacarliriki.com",
            company_phone: "+383 49 XXX XXX",
            company_address: "Gjakova, Kosovo",
          },
          "MNhNohqRQUsqNTUTo"
        );

        return response;
      } catch (error) {
        console.error("EmailJS Error:", error);
        throw error;
      }
    }

    // Send the email
    await sendEmail(data);

    // Show success message
    showNotification(
      translations[currentLanguage].contactSuccess ||
        "Message sent successfully! We'll get back to you soon.",
      "success"
    );
    event.target.reset();
  } catch (error) {
    console.error("Contact form error:", error);
    showNotification(
      translations[currentLanguage].contactError ||
        "Failed to send message. Please try again.",
      "error"
    );
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// Handle newsletter form submission
async function handleNewsletterForm(event) {
  event.preventDefault();

  const email = document.getElementById("newsletterEmail").value;

  // Store newsletter subscription
  let subscribers =
    JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];

  if (subscribers.includes(email)) {
    showNotification(
      translations[currentLanguage].newsletterAlreadySubscribed ||
        "You are already subscribed to our newsletter!",
      "info"
    );
    return;
  }

  subscribers.push(email);
  localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));

  // Send welcome email (EmailJS)
  try {
    const response = await emailjs.send(
      "service_rk9xvu9",
      "template_k8h43gd",
      {
        to_email: email,
        from_name: "Rent a Car Liriki",
        from_email: "noreply@rentacarliriki.com",
        subject: "Welcome to Rent a Car Liriki Newsletter!",
        message:
          "Thank you for subscribing to our newsletter. You'll receive exclusive offers and updates soon!",
      },
      "MNhNohqRQUsqNTUTo"
    );

    showNotification(
      translations[currentLanguage].newsletterSuccess ||
        "Successfully subscribed to newsletter! Welcome email sent.",
      "success"
    );
    document.getElementById("newsletterForm").reset();
  } catch (error) {
    showNotification(
      translations[currentLanguage].newsletterSuccess ||
        "Successfully subscribed to newsletter!",
      "success"
    );
    document.getElementById("newsletterForm").reset();
  }
}

// Handle login form submission
function handleLoginForm(event) {
  event.preventDefault();
  console.log("Login form submitted");

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Basic validation
  if (!email || !password) {
    showNotification(
      translations[currentLanguage].fillAllFields ||
        "Please fill in all fields.",
      "error"
    );
    return;
  }

  // Check if user exists
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    console.log("Login successful for user:", user.name);
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    showNotification(
      translations[currentLanguage].loginSuccess || "Login successful!",
      "success"
    );
    closeModal("loginModal");
    console.log("Calling updateUserInterface after login");
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      updateUserInterface();
    }, 100);
    event.target.reset();
  } else {
    showNotification(
      translations[currentLanguage].invalidCredentials ||
        "Invalid email or password.",
      "error"
    );
  }
}

// Handle signup form submission
function handleSignupForm(event) {
  event.preventDefault();
  console.log("Signup form submitted");

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const phone = document.getElementById("signupPhone").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;
  const agreeTerms = document.getElementById("agreeTerms").checked;

  // Validation
  if (!name || !email || !phone || !password || !confirmPassword) {
    showNotification(
      translations[currentLanguage].fillAllFields ||
        "Please fill in all fields.",
      "error"
    );
    return;
  }

  if (password !== confirmPassword) {
    showNotification(
      translations[currentLanguage].passwordsDontMatch ||
        "Passwords do not match.",
      "error"
    );
    return;
  }

  if (!agreeTerms) {
    showNotification(
      translations[currentLanguage].agreeTerms ||
        "Please agree to the terms and conditions.",
      "error"
    );
    return;
  }

  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    showNotification(
      translations[currentLanguage].emailExists ||
        "An account with this email already exists.",
      "error"
    );
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    password,
    address: "",
    license: "",
    profilePicture: "",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  currentUser = newUser;
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  showNotification(
    translations[currentLanguage].accountCreated ||
      "Account created successfully!",
    "success"
  );
  closeModal("signupModal");
  console.log("Calling updateUserInterface after signup");
  // Add a small delay to ensure DOM is ready
  setTimeout(() => {
    updateUserInterface();
  }, 100);
  event.target.reset();
}

// Handle booking form submission
async function handleBookingForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    car: formData.get("bookingCar"),
    pickupDate: formData.get("pickupDate"),
    returnDate: formData.get("returnDate"),
    pickupLocation: formData.get("pickupLocation"),
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone"),
  };

  // Validation
  if (
    !data.car ||
    !data.pickupDate ||
    !data.returnDate ||
    !data.pickupLocation ||
    !data.customerName ||
    !data.customerEmail ||
    !data.customerPhone
  ) {
    showNotification("Please fill in all fields.", "error");
    return;
  }

  // Check if return date is after pickup date
  if (new Date(data.returnDate) <= new Date(data.pickupDate)) {
    showNotification("Return date must be after pickup date.", "error");
    return;
  }

  // Show loading state
  const submitBtn = event.target.querySelector(".booking-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  submitBtn.disabled = true;

  try {
    // Calculate booking duration and pricing
    const pickupDate = new Date(data.pickupDate);
    const returnDate = new Date(data.returnDate);
    const duration = Math.ceil(
      (returnDate - pickupDate) / (1000 * 60 * 60 * 24)
    );

    // Get car details and pricing
    const carDetails = getCarDetails(data.car);
    const dailyRate = carDetails.price;
    const totalAmount = dailyRate * duration;

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      userId: currentUser ? currentUser.id : null,
      car: data.car,
      carName: carDetails.name,
      carPrice: carDetails.price,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      pickupLocation: data.pickupLocation,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      duration: duration,
      totalAmount: totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Send booking email
    await sendBookingEmail(booking);

    // Save booking
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    showNotification(
      translations[currentLanguage].bookingSuccess ||
        "Booking submitted successfully! We'll confirm your reservation soon.",
      "success"
    );
    closeModal("bookingModal");
    event.target.reset();
  } catch (error) {
    console.error("Booking error:", error);
    showNotification("Failed to submit booking. Please try again.", "error");
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// Send booking email function
async function sendBookingEmail(booking) {
  try {
    // Get current timestamp
    const now = new Date();
    const bookingTime = now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });

    // Format dates for display
    const pickupDateFormatted = new Date(booking.pickupDate).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const returnDateFormatted = new Date(booking.returnDate).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const response = await emailjs.send(
      "service_rk9xvu9",
      "template_cdkm1wc", // Booking template
      {
        to_email: "triumfhadri@gmail.com",
        from_name: "Rent a Car Liriki Booking System",
        from_email: "noreply@rentacarliriki.com",
        subject: `New Car Booking - ${booking.carName} - ${booking.customerName}`,
        message: `New booking received for ${booking.carName}`,

        // Booking specific variables
        booking_id: booking.id,
        customer_name: booking.customerName,
        customer_email: booking.customerEmail,
        customer_phone: booking.customerPhone,
        car_name: booking.carName,
        car_price: `€${booking.carPrice}`,
        pickup_date: pickupDateFormatted,
        return_date: returnDateFormatted,
        pickup_location: booking.pickupLocation,
        booking_duration: booking.duration,
        daily_rate: `€${booking.carPrice}`,
        subtotal: `€${booking.totalAmount}`,
        total_amount: `€${booking.totalAmount}`,
        booking_time: bookingTime,
        user_id: booking.userId || "Guest User",

        // Additional company info
        company_name: "Rent a Car Liriki",
        company_email: "info@rentacarliriki.com",
        company_phone: "+383 49 XXX XXX",
        company_address: "Gjakova, Kosovo",
      },
      "MNhNohqRQUsqNTUTo"
    );

    return response;
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
}

// Get car details function
function getCarDetails(carId) {
  const carDetails = {
    "audi-a3": { name: "Audi A3", price: 40 },
    "bmw-x3": { name: "BMW X3", price: 60 },
    "mercedes-c": { name: "Mercedes C-Class", price: 80 },
  };

  return carDetails[carId] || { name: "Unknown Car", price: 0 };
}

// Handle subscribe form submission
function handleSubscribeForm(event) {
  event.preventDefault();

  const email = event.target.querySelector('input[type="email"]').value;

  if (!email) {
    showNotification("Please enter your email address.", "error");
    return;
  }

  // Simulate subscription process
  showNotification("Successfully subscribed to our newsletter!", "success");
  event.target.reset();

  console.log("Subscribe attempt:", { email });
}

// Send email function (simulated)
async function sendEmail(data) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real implementation, you would use a service like EmailJS, SendGrid, or your own backend
  // For now, we'll just log the data
  console.log("Email data to send to triumfhadri@gmail.com:", data);

  // You can integrate with EmailJS like this:
  /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'triumfhadri@gmail.com',
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message
    }, 'YOUR_USER_ID');
    */

  return true;
}

// Animation functionality
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".car-card, .security-card, .benefit-item, .stat-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Statistics counter animation
function initStatistics() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute("data-target"));
          animateCounter(target, 0, finalValue, 2000);
          countObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    countObserver.observe(stat);
  });
}

// Animate counter function
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Helper functions for notifications
function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-circle";
    case "warning":
      return "fa-exclamation-triangle";
    default:
      return "fa-info-circle";
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "#28a745";
    case "error":
      return "#dc3545";
    case "warning":
      return "#ffc107";
    default:
      return "#17a2b8";
  }
}

// Add CSS for notification animations
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      const area = document.getElementById("areaSelect").value;
      const type = document.getElementById("typeSelect").value;

      if (!area || !type) {
        showNotification("Please select both area and car type.", "warning");
        return;
      }

      // Simulate search
      showNotification(`Searching for ${type} cars in ${area}...`, "info");

      // Here you would typically filter the car listings
      console.log("Search:", { area, type });
    });
  }
});

// Language selector functionality
document.addEventListener("DOMContentLoaded", function () {
  const languageSelector = document.querySelector(".language-selector");
  if (languageSelector) {
    languageSelector.addEventListener("change", function () {
      const selectedLanguage = this.value;
      showNotification(`Language changed to ${selectedLanguage}`, "info");

      // Here you would typically implement language switching
      console.log("Language changed to:", selectedLanguage);
    });
  }
});

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone);
}

// Add form validation to inputs
document.addEventListener("DOMContentLoaded", function () {
  const emailInputs = document.querySelectorAll('input[type="email"]');
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = "#dc3545";
        showNotification("Please enter a valid email address.", "error");
      } else {
        this.style.borderColor = "#444";
      }
    });
  });

  phoneInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = "#dc3545";
        showNotification("Please enter a valid phone number.", "error");
      } else {
        this.style.borderColor = "#444";
      }
    });
  });
});

// User System Functions
function initUserSystem() {
  console.log("Initializing user system");

  // Check if user is already logged in
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUserInterface();
    console.log("User already logged in:", currentUser.name);
  } else {
    console.log("No user logged in");
  }

  // Create a test user if no users exist (for testing purposes)
  if (users.length === 0) {
    const testUser = {
      id: "test-user-1",
      name: "Test User",
      email: "test@example.com",
      phone: "123-456-7890",
      password: "password123",
      address: "",
      license: "",
      profilePicture: "",
      createdAt: new Date().toISOString(),
    };
    users.push(testUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Created test user:", testUser.email, "Password: password123");
  }

  // Add profile form handler
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", handleProfileUpdate);
    console.log("Profile form event listener attached");
  } else {
    console.log("Profile form not found");
  }
}

function updateUserInterface() {
  console.log("Updating user interface, currentUser:", currentUser);

  const authButtons = document.getElementById("authButtons");
  const userProfile = document.getElementById("userProfile");
  const userName = document.getElementById("userName");
  const profileUserName = document.getElementById("profileUserName");
  const profileUserEmail = document.getElementById("profileUserEmail");
  const profileBtn = document.querySelector(".profile-btn");

  console.log("Found elements:", {
    authButtons: !!authButtons,
    userProfile: !!userProfile,
    userName: !!userName,
    profileUserName: !!profileUserName,
    profileUserEmail: !!profileUserEmail,
    profileBtn: !!profileBtn,
  });

  if (currentUser) {
    console.log("User is logged in, showing profile");
    // Show user profile, hide auth buttons
    if (authButtons) authButtons.style.display = "none";
    if (userProfile) userProfile.style.display = "block";

    // Update user info
    if (userName) userName.textContent = currentUser.name;
    if (profileUserName) profileUserName.textContent = currentUser.name;
    if (profileUserEmail) profileUserEmail.textContent = currentUser.email;

    // Update profile picture in dropdown
    if (profileBtn) {
      const iconElement = profileBtn.querySelector("i.fa-user-circle");
      if (currentUser.profilePicture) {
        // Replace icon with profile picture
        if (iconElement) {
          iconElement.style.display = "none";
        }
        let profileImg = profileBtn.querySelector(".profile-img");
        if (!profileImg) {
          profileImg = document.createElement("img");
          profileImg.className = "profile-img";
          profileImg.style.cssText =
            "width: 20px; height: 20px; border-radius: 50%; object-fit: cover; margin-right: 8px;";
          profileBtn.insertBefore(profileImg, profileBtn.firstChild);
        }
        profileImg.src = currentUser.profilePicture;
        profileImg.style.display = "block";
      } else {
        // Show default icon
        if (iconElement) {
          iconElement.style.display = "inline-block";
        }
        const profileImg = profileBtn.querySelector(".profile-img");
        if (profileImg) {
          profileImg.style.display = "none";
        }
      }
    }
  } else {
    // Show auth buttons, hide user profile
    authButtons.style.display = "block";
    userProfile.style.display = "none";
  }
}

function toggleProfileMenu() {
  const profileMenu = document.getElementById("profileMenu");
  profileMenu.classList.toggle("active");
}

function openProfileModal() {
  if (!currentUser) return;

  // Populate form with current user data
  document.getElementById("editName").value = currentUser.name;
  document.getElementById("editEmail").value = currentUser.email;
  document.getElementById("editPhone").value = currentUser.phone;
  document.getElementById("editAddress").value = currentUser.address || "";
  document.getElementById("editLicense").value = currentUser.license || "";

  // Update profile header with current picture
  updateProfileHeader();

  openModal("profileModal");
  toggleProfileMenu();
}

function updateProfileHeader() {
  const profileHeader = document.querySelector(".profile-header");
  if (profileHeader && currentUser) {
    const iconElement = profileHeader.querySelector("i.fa-user-circle");
    if (currentUser.profilePicture) {
      // Replace icon with profile picture
      if (iconElement) {
        iconElement.style.display = "none";
      }
      let profileImg = profileHeader.querySelector(".profile-header-img");
      if (!profileImg) {
        profileImg = document.createElement("img");
        profileImg.className = "profile-header-img";
        profileImg.style.cssText =
          "width: 60px; height: 60px; border-radius: 50%; object-fit: cover;";
        profileHeader.insertBefore(profileImg, profileHeader.firstChild);
      }
      profileImg.src = currentUser.profilePicture;
      profileImg.style.display = "block";
    } else {
      // Show default icon
      if (iconElement) {
        iconElement.style.display = "inline-block";
      }
      const profileImg = profileHeader.querySelector(".profile-header-img");
      if (profileImg) {
        profileImg.style.display = "none";
      }
    }
  }
}

function handleProfileUpdate(event) {
  event.preventDefault();
  console.log("Profile update form submitted");

  const name = document.getElementById("editName").value;
  const email = document.getElementById("editEmail").value;
  const phone = document.getElementById("editPhone").value;
  const address = document.getElementById("editAddress").value;
  const license = document.getElementById("editLicense").value;
  const profilePictureFile = document.getElementById("profilePicture").files[0];

  // Handle profile picture upload
  if (profilePictureFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentUser.profilePicture = e.target.result;
      saveUserData();
    };
    reader.readAsDataURL(profilePictureFile);
  } else {
    saveUserData();
  }

  function saveUserData() {
    // Update current user
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.address = address;
    currentUser.license = license;

    // Update in users array
    const userIndex = users.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
    }

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update UI
    updateUserInterface();

    showNotification(
      translations[currentLanguage].profileUpdated ||
        "Profile updated successfully!",
      "success"
    );
    closeModal("profileModal");
  }
}

function openBookingHistory() {
  if (!currentUser) return;

  const userBookings = bookings.filter(
    (booking) => booking.userId === currentUser.id
  );
  const bookingHistory = document.getElementById("bookingHistory");

  if (userBookings.length === 0) {
    bookingHistory.innerHTML =
      '<p style="text-align: center; color: #cccccc;">No bookings found.</p>';
  } else {
    bookingHistory.innerHTML = userBookings
      .map(
        (booking) => `
      <div class="booking-item">
        <h4>${booking.car}</h4>
        <div class="booking-details">
          <div class="booking-detail">
            <span>Pickup Date</span>
            <span>${new Date(booking.pickupDate).toLocaleDateString()}</span>
          </div>
          <div class="booking-detail">
            <span>Return Date</span>
            <span>${new Date(booking.returnDate).toLocaleDateString()}</span>
          </div>
          <div class="booking-detail">
            <span>Location</span>
            <span>${booking.pickupLocation}</span>
          </div>
          <div class="booking-detail">
            <span>Status</span>
            <span class="booking-status ${booking.status}">${
          booking.status
        }</span>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  openModal("bookingHistoryModal");
  toggleProfileMenu();
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  updateUserInterface();
  toggleProfileMenu();
  showNotification(
    translations[currentLanguage].logoutSuccess || "Logged out successfully!",
    "success"
  );
}

// Language System Functions
function initLanguageSystem() {
  const languageSelector = document.getElementById("languageSelector");
  if (languageSelector) {
    languageSelector.value = currentLanguage;
    languageSelector.addEventListener("change", function () {
      currentLanguage = this.value;
      localStorage.setItem("language", currentLanguage);
      updateLanguage();
      showNotification(
        `Language changed to ${this.value === "sq" ? "Albanian" : "English"}`,
        "info"
      );
    });
  }

  updateLanguage();
}

function updateLanguage() {
  // Update navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "#home") {
      link.textContent = translations[currentLanguage].home;
    } else if (href === "#about") {
      link.textContent = translations[currentLanguage].about;
    } else if (href === "#fleet") {
      link.textContent = translations[currentLanguage].fleet;
    } else if (href === "#contact") {
      link.textContent = translations[currentLanguage].contact;
    }
  });

  // Update buttons
  const loginBtn = document.querySelector(".login-btn");
  if (loginBtn) {
    loginBtn.textContent = translations[currentLanguage].login;
  }

  // Update website content
  updateWebsiteContent();

  // Update form placeholders and labels
  updateFormTranslations();
}

function updateWebsiteContent() {
  // Update section titles
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    const text = title.textContent.toLowerCase();
    if (text.includes("our fleet") && translations[currentLanguage].ourFleet) {
      title.textContent = translations[currentLanguage].ourFleet;
    } else if (
      text.includes("security") &&
      translations[currentLanguage].security
    ) {
      title.textContent = translations[currentLanguage].security;
    } else if (
      text.includes("why choose us") &&
      translations[currentLanguage].whyChooseUs
    ) {
      title.textContent = translations[currentLanguage].whyChooseUs;
    } else if (
      text.includes("testimonials") &&
      translations[currentLanguage].testimonials
    ) {
      title.textContent = translations[currentLanguage].testimonials;
    } else if (
      text.includes("contact us") &&
      translations[currentLanguage].contactUs
    ) {
      title.textContent = translations[currentLanguage].contactUs;
    }
  });

  // Update section subtitles
  const sectionSubtitles = document.querySelectorAll(".section-subtitle");
  sectionSubtitles.forEach((subtitle) => {
    const text = subtitle.textContent.toLowerCase();
    if (
      text.includes("premium vehicles") &&
      translations[currentLanguage].premiumVehicles
    ) {
      subtitle.textContent = translations[currentLanguage].premiumVehicles;
    } else if (
      text.includes("your safety") &&
      translations[currentLanguage].yourSafety
    ) {
      subtitle.textContent = translations[currentLanguage].yourSafety;
    } else if (
      text.includes("premier choice") &&
      translations[currentLanguage].premierChoice
    ) {
      subtitle.textContent = translations[currentLanguage].premierChoice;
    } else if (
      text.includes("our customers") &&
      translations[currentLanguage].ourCustomers
    ) {
      subtitle.textContent = translations[currentLanguage].ourCustomers;
    } else if (
      text.includes("get in touch") &&
      translations[currentLanguage].getInTouch
    ) {
      subtitle.textContent = translations[currentLanguage].getInTouch;
    }
  });

  // Update hero content
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle && translations[currentLanguage].heroTitle) {
    heroTitle.textContent = translations[currentLanguage].heroTitle;
  }

  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle && translations[currentLanguage].heroSubtitle) {
    heroSubtitle.textContent = translations[currentLanguage].heroSubtitle;
  }

  const heroDescription = document.querySelector(".hero-description");
  if (heroDescription && translations[currentLanguage].heroDescription) {
    heroDescription.textContent = translations[currentLanguage].heroDescription;
  }

  // Update CTA button
  const ctaBtn = document.querySelector(".cta-btn");
  if (ctaBtn && translations[currentLanguage].bookNow) {
    ctaBtn.textContent = translations[currentLanguage].bookNow;
  }

  // Update newsletter section
  const newsletterTitle = document.querySelector(".newsletter-text h2");
  if (newsletterTitle && translations[currentLanguage].stayUpdated) {
    newsletterTitle.textContent = translations[currentLanguage].stayUpdated;
  }

  const newsletterDesc = document.querySelector(".newsletter-text p");
  if (newsletterDesc && translations[currentLanguage].newsletterDesc) {
    newsletterDesc.textContent = translations[currentLanguage].newsletterDesc;
  }

  // Update footer content
  const footerLinks = document.querySelectorAll(".footer-section h3");
  footerLinks.forEach((link) => {
    const text = link.textContent.toLowerCase();
    if (
      text.includes("useful links") &&
      translations[currentLanguage].usefulLinks
    ) {
      link.textContent = translations[currentLanguage].usefulLinks;
    }
  });
}

function updateFormTranslations() {
  // Update contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const subjectInput = contactForm.querySelector('input[name="subject"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');

    if (nameInput)
      nameInput.placeholder = translations[currentLanguage].yourName;
    if (emailInput)
      emailInput.placeholder = translations[currentLanguage].yourEmail;
    if (subjectInput)
      subjectInput.placeholder = translations[currentLanguage].subject;
    if (messageInput)
      messageInput.placeholder = translations[currentLanguage].yourMessage;
  }

  // Update auth forms
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const nameInput = signupForm.querySelector("#signupName");
    const emailInput = signupForm.querySelector("#signupEmail");
    const phoneInput = signupForm.querySelector("#signupPhone");
    const passwordInput = signupForm.querySelector("#signupPassword");
    const confirmPasswordInput = signupForm.querySelector(
      "#signupConfirmPassword"
    );

    if (nameInput)
      nameInput.placeholder = translations[currentLanguage].fullName;
    if (emailInput)
      emailInput.placeholder = translations[currentLanguage].yourEmail;
    if (phoneInput)
      phoneInput.placeholder = translations[currentLanguage].phoneNumber;
    if (passwordInput)
      passwordInput.placeholder = translations[currentLanguage].password;
    if (confirmPasswordInput)
      confirmPasswordInput.placeholder =
        translations[currentLanguage].confirmPassword;
  }
}

// Show car details function
function showCarDetails(carId) {
  const cars = getCarsList();
  const car = cars.find((c) => c.id === carId);

  if (car) {
    // Populate car details modal
    document.getElementById("carDetailImage").src =
      car.image || "images/car-placeholder.jpg";
    document.getElementById("carDetailName").textContent = car.name;
    document.getElementById(
      "carDetailSeats"
    ).textContent = `${car.seats} Seats`;
    document.getElementById("carDetailTransmission").textContent =
      car.transmission;
    document.getElementById("carDetailFuel").textContent = car.fuel;
    document.getElementById("carDetailYear").textContent = car.year || "2023";
    document.getElementById("carDetailPrice").textContent = `€${car.price}`;
    document.getElementById("carDetailDescription").textContent =
      car.description ||
      `Experience luxury and comfort with our ${car.name}. Perfect for both business and leisure travel.`;

    // Populate features
    const featuresList = document.getElementById("carDetailFeatures");
    const features = car.features || [
      "Air Conditioning",
      "Bluetooth Connectivity",
      "GPS Navigation",
      "Backup Camera",
      "USB Charging",
      "Comfortable Seating",
      "Spacious Interior",
      "Fuel Efficient",
    ];

    featuresList.innerHTML = features
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    // Store selected car for booking
    localStorage.setItem("selectedCarForBooking", carId);

    // Show modal
    openModal("carDetailsModal");
  }
}

// Book this car function
function bookThisCar() {
  const carId = localStorage.getItem("selectedCarForBooking");
  if (carId) {
    localStorage.setItem("selectedCarId", carId);
    closeModal("carDetailsModal");
    window.location.href = "book-car.html";
  }
}

// Book car directly from home page
function bookCarFromHome(carId) {
  localStorage.setItem("selectedCarId", carId);
  window.location.href = "book-car.html";
}

// Get cars list function
function getCarsList() {
  return [
    {
      id: "audi-a3",
      name: "Audi A3",
      price: 40,
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2020",
      image: "images/audi-a3.jpg",
      description:
        "The Audi A3 offers a perfect blend of luxury and performance. With its sleek design and advanced technology, it provides an exceptional driving experience.",
      features: [
        "Quattro All-Wheel Drive",
        "Virtual Cockpit",
        "MMI Navigation Plus",
        "Bang & Olufsen Sound System",
        "Audi Pre Sense Safety",
        "LED Headlights",
        "Panoramic Sunroof",
        "Wireless Charging",
      ],
    },
    {
      id: "bmw-x3",
      name: "BMW X3",
      price: 60,
      seats: 5,
      transmission: "Automatic",
      fuel: "Diesel",
      year: "2021",
      image: "images/bmw-x3.jpg",
      description:
        "The BMW X3 combines sporty performance with SUV versatility. Perfect for families and adventure seekers alike.",
      features: [
        "xDrive All-Wheel Drive",
        "iDrive 7.0 System",
        "Live Cockpit Professional",
        "Harman Kardon Sound",
        "Driving Assistant Professional",
        "Adaptive LED Headlights",
        "Panoramic Glass Roof",
        "Comfort Access System",
      ],
    },
    {
      id: "mercedes-c200",
      name: "Mercedes C-Class",
      price: 80,
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2022",
      image: "images/mercedes-c.jpg",
      description:
        "The Mercedes C-Class represents the pinnacle of luxury sedans. Experience unmatched comfort and sophisticated technology.",
      features: [
        "4MATIC All-Wheel Drive",
        "MBUX Infotainment System",
        "Digital Instrument Cluster",
        "Burmester Surround Sound",
        "Driver Assistance Package",
        "MULTIBEAM LED Headlights",
        "Panoramic Sliding Sunroof",
        "Keyless-Go Package",
      ],
    },
  ];
}

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.switchAuth = switchAuth;
window.toggleProfileMenu = toggleProfileMenu;
window.openProfileModal = openProfileModal;
window.openBookingHistory = openBookingHistory;
window.logout = logout;
window.showCarDetails = showCarDetails;
window.bookThisCar = bookThisCar;
window.bookCarFromHome = bookCarFromHome;
