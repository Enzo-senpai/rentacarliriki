# Rent a Car Liriki - Car Rental Website

A modern, responsive car rental website built with HTML, CSS, and JavaScript. Features include user authentication, booking system, admin dashboard, and multi-language support.

## 🌟 Features

- **Responsive Design** - Works on all devices
- **User Authentication** - Login/Signup system
- **Car Booking System** - Complete booking workflow
- **Admin Dashboard** - Manage users and bookings
- **Multi-language Support** - English, Albanian, Serbian
- **Email Notifications** - Booking confirmations via EmailJS
- **Modern UI/UX** - Black and gold theme with animations

## 🚀 Free Deployment Options

### Option 1: GitHub Pages (Recommended)

**Step 1: Create GitHub Repository**

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository"
3. Name it: `rentacarliriki`
4. Make it Public
5. Click "Create repository"

**Step 2: Upload Your Files**

1. Download [GitHub Desktop](https://desktop.github.com/) or use Git commands
2. Clone your repository
3. Copy all files from your `rentacarliriki` folder to the repository
4. Commit and push to GitHub

**Step 3: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at: `https://yourusername.github.io/rentacarliriki`

### Option 2: Netlify (Easiest)

**Step 1: Prepare Your Files**

1. Make sure all files are in the `rentacarliriki` folder
2. Ensure `index.html` is in the root directory

**Step 2: Deploy to Netlify**

1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub (recommended)
3. Click "New site from Git"
4. Choose your GitHub repository
5. Click "Deploy site"
6. Your site will be live in minutes!

**Custom Domain (Optional):**

- Go to "Site settings" → "Domain management"
- Add your custom domain

### Option 3: Vercel

**Step 1: Create Vercel Account**

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"

**Step 2: Deploy**

1. Import your GitHub repository
2. Vercel will auto-detect it's a static site
3. Click "Deploy"
4. Your site will be live instantly!

### Option 4: Firebase Hosting

**Step 1: Install Firebase CLI**

```bash
npm install -g firebase-tools
```

**Step 2: Initialize Firebase**

```bash
firebase login
firebase init hosting
```

**Step 3: Deploy**

```bash
firebase deploy
```

## 📁 File Structure

```
rentacarliriki/
├── index.html                 # Main homepage
├── assets/
│   ├── css/
│   │   ├── main.css          # Main stylesheet
│   │   └── pages/
│   │       └── booking.css   # Booking page styles
│   ├── js/
│   │   ├── main.js           # Main JavaScript
│   │   ├── admin/
│   │   │   ├── admin.js      # Admin dashboard
│   │   │   └── admin-login.js # Admin login
│   │   └── booking/
│   │       └── booking.js    # Booking functionality
│   └── images/               # All website images
├── pages/
│   ├── booking/
│   │   └── book-car.html     # Booking page
│   ├── admin/
│   │   ├── admin.html        # Admin dashboard
│   │   └── admin-login.html  # Admin login
│   └── legal/
│       ├── terms.html        # Terms & Conditions
│       └── privacy.html      # Privacy Policy
└── docs/
    ├── README.md             # This file
    └── emailjs-setup.md      # EmailJS configuration
```

## ⚙️ Configuration

### EmailJS Setup (For Booking Notifications)

1. Go to [EmailJS.com](https://emailjs.com)
2. Create a free account
3. Add your email service (Gmail recommended)
4. Create email templates for:
   - Booking confirmation
   - Admin notifications
5. Update the EmailJS configuration in `assets/js/main.js`

**Current EmailJS Settings:**

```javascript
// Service ID: service_rk9xvu9
// Template ID: template_k8h43gd
// Public Key: MNhNohqRQUsqNTUTo
```

### Admin Access

**Default Admin Credentials:**

- Username: `admin`
- Password: `admin123`

**Test User Credentials:**

- Email: `test@example.com`
- Password: `password123`

## 🎨 Customization

### Colors

The website uses a black and gold theme. To change colors, edit `assets/css/main.css`:

```css
:root {
  --primary-color: #ffd700; /* Gold */
  --secondary-color: #e55a2b; /* Orange */
  --dark-bg: #1a1a1a; /* Dark background */
  --text-color: #ffffff; /* White text */
}
```

### Content

- Update car information in `assets/js/main.js` (getCarsList function)
- Modify company details in `index.html`
- Update contact information throughout the site

## 📱 Mobile Optimization

The website is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Troubleshooting

### Common Issues:

1. **Images Not Loading**

   - Check file paths in HTML files
   - Ensure images are in `assets/images/` folder

2. **JavaScript Not Working**

   - Check browser console for errors (F12)
   - Verify all file paths are correct
   - Ensure EmailJS is properly configured

3. **Forms Not Submitting**

   - Check EmailJS configuration
   - Verify internet connection
   - Check browser console for errors

4. **Admin Login Issues**
   - Clear browser cache
   - Check localStorage in browser dev tools
   - Verify admin credentials

## 🌐 SEO Optimization

The website includes:

- Meta tags for social sharing
- Semantic HTML structure
- Alt text for images
- Proper heading hierarchy
- Mobile-friendly design

## 📊 Analytics (Optional)

To add Google Analytics:

1. Create a Google Analytics account
2. Get your tracking ID
3. Add this code before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_TRACKING_ID");
</script>
```

## 🔒 Security Notes

- Change default admin password after deployment
- Regularly update EmailJS credentials
- Monitor for suspicious activities
- Keep backups of your website files

## 📞 Support

For technical support or questions:

- Check the browser console for error messages
- Review the EmailJS setup guide in `docs/emailjs-setup.md`
- Ensure all file paths are correct for your hosting platform

## 🎉 Deployment Checklist

- [ ] All files uploaded to hosting platform
- [ ] EmailJS configured and tested
- [ ] Admin password changed from default
- [ ] Contact information updated
- [ ] Car fleet information updated
- [ ] Terms and Privacy Policy reviewed
- [ ] Mobile responsiveness tested
- [ ] Booking system tested
- [ ] Admin dashboard tested

## 📈 Performance Tips

1. **Optimize Images**

   - Compress images before uploading
   - Use WebP format when possible
   - Keep image sizes under 500KB

2. **Minimize HTTP Requests**

   - Combine CSS files if possible
   - Use CSS sprites for small icons

3. **Enable Caching**
   - Most hosting platforms enable this automatically
   - Set appropriate cache headers

## 🚀 Quick Start

1. Choose your hosting platform (GitHub Pages recommended)
2. Upload all files maintaining the folder structure
3. Configure EmailJS for booking notifications
4. Test all functionality
5. Share your website URL!

---

**Made with ❤️ for Rent a Car Liriki**

_This website is designed to provide a professional car rental experience with modern web technologies._
