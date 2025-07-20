# EmailJS Setup Guide for Car Rental Booking System

## Overview

This guide will help you set up EmailJS to send booking notifications to the admin when customers make car rental bookings.

## EmailJS Configuration

### 1. Service ID

- **Service ID**: `service_id` (replace with your actual EmailJS service ID)
- **Service Type**: Email Service (Gmail, Outlook, etc.)

### 2. Template ID

- **Template ID**: `template_cdkm1wc`
- **Template Type**: Email Template

### 3. User ID

- **User ID**: `MNhNohqRQUsqNTUTo` (already configured in the HTML)

## Email Template Variables

The booking system sends the following data to the email template:

| Variable           | Description                | Example                  |
| ------------------ | -------------------------- | ------------------------ |
| `to_email`         | Admin email address        | admin@rentacarliriki.com |
| `booking_id`       | Unique booking identifier  | BK1703123456789ABC123    |
| `customer_name`    | Customer's full name       | John Doe                 |
| `customer_email`   | Customer's email address   | john@example.com         |
| `customer_phone`   | Customer's phone number    | +383 44 123 456          |
| `customer_license` | Driver's license number    | ABC123456789             |
| `car_name`         | Selected car model         | Audi A3                  |
| `car_type`         | Car category               | Sedan                    |
| `pickup_location`  | Pickup location            | Pristina Airport         |
| `pickup_date`      | Pickup date                | 2024-01-15               |
| `return_date`      | Return date                | 2024-01-20               |
| `total_days`       | Rental duration in days    | 5                        |
| `total_cost`       | Total rental cost in EUR   | 200                      |
| `special_requests` | Customer special requests  | None                     |
| `booking_date`     | Date when booking was made | 1/15/2024                |
| `booking_time`     | Time when booking was made | 2:30:45 PM               |

## EmailJS Template Example

Here's an example of how your EmailJS template should look:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>New Car Rental Booking</title>
  </head>
  <body>
    <h2>🚗 New Car Rental Booking Received</h2>

    <div
      style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;"
    >
      <h3>📋 Booking Details</h3>
      <p><strong>Booking ID:</strong> {{booking_id}}</p>
      <p><strong>Booking Date:</strong> {{booking_date}} at {{booking_time}}</p>
    </div>

    <div
      style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0;"
    >
      <h3>👤 Customer Information</h3>
      <p><strong>Name:</strong> {{customer_name}}</p>
      <p><strong>Email:</strong> {{customer_email}}</p>
      <p><strong>Phone:</strong> {{customer_phone}}</p>
      <p><strong>Driver's License:</strong> {{customer_license}}</p>
    </div>

    <div
      style="background-color: #f3e5f5; padding: 20px; border-radius: 10px; margin: 20px 0;"
    >
      <h3>🚙 Vehicle Information</h3>
      <p><strong>Car:</strong> {{car_name}} ({{car_type}})</p>
      <p><strong>Pickup Location:</strong> {{pickup_location}}</p>
      <p><strong>Pickup Date:</strong> {{pickup_date}}</p>
      <p><strong>Return Date:</strong> {{return_date}}</p>
      <p><strong>Duration:</strong> {{total_days}} days</p>
      <p><strong>Total Cost:</strong> €{{total_cost}}</p>
    </div>

    <div
      style="background-color: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;"
    >
      <h3>📝 Special Requests</h3>
      <p>{{special_requests}}</p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #666;">
        This booking was submitted through the Rent a Car Liriki website.
      </p>
    </div>
  </body>
</html>
```

## Setup Instructions

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service

1. Go to Email Services in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your Service ID

### 3. Create Email Template

1. Go to Email Templates in your EmailJS dashboard
2. Click "Create New Template"
3. Use the template example above
4. Save the template and note down the Template ID

### 4. Update the Code

Replace the placeholder values in `book-car.html`:

```javascript
// Replace 'service_id' with your actual service ID
emailjs.send("YOUR_SERVICE_ID", "template_cdkm1wc", templateParams);
```

### 5. Test the System

1. Fill out the booking form on your website
2. Submit a test booking
3. Check if the admin receives the email notification

## Troubleshooting

### Common Issues:

1. **Email not sending**: Check if EmailJS is properly initialized
2. **Template variables not showing**: Ensure variable names match exactly
3. **Service authentication failed**: Re-authenticate your email service
4. **Template not found**: Verify the template ID is correct

### Debug Steps:

1. Check browser console for JavaScript errors
2. Verify EmailJS initialization in the HTML
3. Test with EmailJS dashboard's test feature
4. Check email service authentication status

## Security Notes

- Keep your EmailJS credentials secure
- Don't expose service IDs in public repositories
- Consider using environment variables for production
- Regularly rotate your email service passwords

## Support

If you need help with EmailJS setup:

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Community Forum: https://www.emailjs.com/community/
