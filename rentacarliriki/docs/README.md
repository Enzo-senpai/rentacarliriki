# Rent a Car Liriki - Premium Car Rental Website

A modern, responsive website for "Rent a Car Liriki" - a premium car rental service in Kosovo. Built with HTML5, CSS3, and JavaScript, featuring a sleek dark theme with orange accents.

## 🌟 Features

### 🎨 Design & User Experience

- **Modern Dark Theme**: Sleek black and orange color scheme
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: CSS animations and transitions
- **Professional Layout**: Clean, modern interface
- **Font Awesome Icons**: Beautiful iconography throughout

### 🚗 Core Functionality

- **Car Fleet Display**: Showcase available vehicles
- **Search & Filter**: Find cars by area and type
- **Booking System**: Complete booking form with validation
- **Contact Form**: Email integration (configured for triumfhadri@gmail.com)
- **User Authentication**: Login and signup modals
- **Multi-language Support**: Language selector (English, Albanian, Serbian)

### 📱 Interactive Elements

- **Modal Windows**: Login, signup, and booking forms
- **Form Validation**: Real-time input validation
- **Notification System**: Success/error messages
- **Smooth Scrolling**: Navigation with smooth scroll
- **Statistics Counter**: Animated number counters
- **Mobile Menu**: Hamburger menu for mobile devices

### 🛡️ Security & Legal

- **Privacy Policy**: Comprehensive privacy policy page
- **Terms & Conditions**: Detailed terms and conditions
- **Form Security**: Input validation and sanitization
- **Email Integration**: Contact form sends to specified email

## 📁 Project Structure

```
rentacarliriki/
├── index.html              # Main homepage
├── privacy.html            # Privacy policy page
├── terms.html              # Terms & conditions page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── script.js           # JavaScript functionality
├── images/
│   └── README.md           # Image requirements guide
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML/CSS/JavaScript (for customization)

### Installation

1. Download or clone the project files
2. Open `index.html` in your web browser
3. The website is ready to use!

### Customization

#### Adding Car Images

1. Place your car images in the `images/` folder
2. Recommended filenames:
   - `audi-a3.jpg`
   - `bmw-x3.jpg`
   - `mercedes-c.jpg`
3. Ensure images are high quality (800x600px minimum)

#### Email Configuration

The contact form is configured to send emails to `triumfhadri@gmail.com`. To set up email functionality:

1. **Option 1: EmailJS (Recommended)**

   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Get your service ID, template ID, and user ID
   - Update the JavaScript code in `js/script.js`

2. **Option 2: Backend Integration**
   - Set up a backend server (Node.js, PHP, etc.)
   - Configure email sending functionality
   - Update the form submission handler

#### Content Customization

- Update company information in `index.html`
- Modify car details and pricing
- Change contact information
- Update legal documents (privacy.html, terms.html)

## 🎯 Key Sections

### Homepage Sections

1. **Hero Section**: Eye-catching introduction with call-to-action
2. **Search Section**: Car search by area and type
3. **Fleet Section**: Display of available vehicles
4. **Security Features**: Trust-building security information
5. **Why Choose Us**: Company benefits and advantages
6. **Statistics**: Key metrics and achievements
7. **Testimonials**: Customer reviews and feedback
8. **Contact Section**: Contact form and information

### Additional Pages

- **Privacy Policy**: Data protection and privacy information
- **Terms & Conditions**: Rental terms and legal information

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins font family

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Features

- Optimized CSS and JavaScript
- Responsive images
- Smooth animations
- Fast loading times

## 📧 Contact Form Setup

The contact form is designed to send emails to `triumfhadri@gmail.com`. Here's how to configure it:

### EmailJS Setup (Recommended)

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Update the JavaScript code:

```javascript
// In js/script.js, replace the sendEmail function:
emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  {
    to_email: "triumfhadri@gmail.com",
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
  },
  "YOUR_USER_ID"
);
```

## 🎨 Customization Guide

### Colors

The website uses a consistent color scheme:

- **Primary Orange**: `#ff6b35`
- **Dark Background**: `#0a0a0a`
- **Secondary Dark**: `#1a1a1a`
- **Text Colors**: `#ffffff`, `#cccccc`

### Fonts

- **Primary Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Maintenance

### Regular Updates

- Update car inventory and pricing
- Refresh testimonials and reviews
- Update contact information
- Review and update legal documents

### Performance Optimization

- Compress images for web
- Minify CSS and JavaScript for production
- Enable browser caching
- Use a CDN for external resources

## 📞 Support

For technical support or customization requests:

- **Email**: info@rentacarliriki.com
- **Phone**: +383 44 123 456

## 📄 License

This project is created for Rent a Car Liriki. All rights reserved.

---

**Built with ❤️ for Rent a Car Liriki - Your Premier Choice for Stress-Free Travel in Kosovo**
