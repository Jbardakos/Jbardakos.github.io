# MeetShoggoth - ASCII Meeting Scheduler

A retro-styled web application for coordinating meeting times across multiple users with an ASCII aesthetic.

## Features

- **User Authentication**: Secure signup and login system with password protection
- **ASCII Calendar Interface**: Visual calendar showing Monday-Friday, 9:00-18:00 time slots
- **Availability Selection**: Click to toggle your available time slots
- **Optimal Time Finder**: Automatically finds times when ALL users are available
- **Local Storage**: All data persists in your browser's localStorage
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - No server or installation required!

2. **Sign Up**
   - Create an account with a username and password
   - Password must be at least 4 characters
   - Your credentials are stored securely in your browser

3. **Login**
   - Use your username and password to login
   - Your session persists until you logout

4. **Set Your Availability**
   - Click on time slots to mark when you're available
   - Selected slots will show `[X]`
   - Click "SAVE AVAILABILITY" when done

5. **Find Optimal Meeting Times**
   - Click "FIND OPTIMAL MEETING TIMES"
   - See all times when everyone is available
   - View individual user availabilities

## Technical Details

- Pure HTML, CSS, and JavaScript
- No external dependencies
- Data stored in browser localStorage
- ASCII art and monospace font aesthetic
- Green terminal-style color scheme

## Files

- `index.html` - Main application structure
- `app.js` - Application logic and functionality
- `style.css` - ASCII aesthetic styling
- `README.md` - This file

## Browser Compatibility

Works in all modern browsers that support:
- localStorage
- CSS Grid
- ES6 JavaScript

## Security Note

This application stores all data in browser localStorage. For production use, implement:
- Server-side authentication
- Encrypted password storage
- Database for persistent storage
- HTTPS connections

## Development

To modify or extend the application:
1. Edit the HTML structure in `index.html`
2. Add functionality in `app.js`
3. Customize styling in `style.css`

Enjoy coordinating meetings with MeetShoggoth!
