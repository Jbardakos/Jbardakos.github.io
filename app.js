// MeetShoggoth - Meeting Scheduler Application
// Data storage using localStorage

let currentUser = null;

// Sound System - 8088 PC Speaker Style
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(freq = 800, duration = 50, volume = 0.3) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = freq;
    oscillator.type = 'square'; // PC speaker style
    gainNode.gain.value = volume;

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function playClick() {
    playBeep(1200, 30, 0.2);
}

function playError() {
    playBeep(200, 100, 0.3);
    setTimeout(() => playBeep(150, 100, 0.3), 100);
}

function playSuccess() {
    playBeep(800, 60, 0.2);
    setTimeout(() => playBeep(1000, 60, 0.2), 70);
    setTimeout(() => playBeep(1200, 80, 0.2), 140);
}

function playGlitch() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            playBeep(Math.random() * 500 + 300, 20, 0.15);
        }, i * 25);
    }
}

function playStartup() {
    playBeep(400, 100, 0.2);
    setTimeout(() => playBeep(600, 100, 0.2), 110);
    setTimeout(() => playBeep(800, 150, 0.2), 220);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    playStartup();
});

function initializeApp() {
    // Initialize default Dr. Bardakos account
    initializeDrBardakosAccount();

    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showAvailabilityScreen();
    }
}

function initializeDrBardakosAccount() {
    const users = getUsers();

    // Create Dr. Bardakos account if it doesn't exist
    if (!users['jbardakos']) {
        users['jbardakos'] = {
            password: 'vw1302l72',
            name: 'Dr. Bardakos',
            email: 'dr.bardakos@esoteric.edu',
            registrationDate: new Date().toISOString(),
            availability: {}
        };
        saveUsers(users);
    }
}

// ==================== AUTHENTICATION ====================

function toggleAuthForm() {
    playClick();
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }

    clearAuthMessage();
}

function signup() {
    playClick();
    const username = document.getElementById('signup-username').value.trim();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    clearAuthMessage();

    // Validation
    if (!username || !name || !email || !password || !confirm) {
        playError();
        showAuthMessage('All fields are required!', 'error');
        return;
    }

    if (password !== confirm) {
        playError();
        showAuthMessage('Passwords do not match!', 'error');
        return;
    }

    if (password.length < 4) {
        playError();
        showAuthMessage('Password must be at least 4 characters!', 'error');
        return;
    }

    // Get existing users
    const users = getUsers();

    // Check if username exists
    if (users[username]) {
        playError();
        showAuthMessage('Username already exists!', 'error');
        return;
    }

    // Create new user
    users[username] = {
        password: password,
        name: name,
        email: email,
        registrationDate: new Date().toISOString(),
        availability: {}
    };

    saveUsers(users);
    playSuccess();
    showAuthMessage('Account created successfully! You can now login.', 'success');

    // Clear form and switch to login
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-confirm').value = '';

    setTimeout(() => {
        toggleAuthForm();
    }, 1500);
}

function login() {
    playClick();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    clearAuthMessage();

    if (!username || !password) {
        playError();
        showAuthMessage('Please enter username and password!', 'error');
        return;
    }

    const users = getUsers();

    if (!users[username]) {
        playError();
        showAuthMessage('User not found!', 'error');
        return;
    }

    if (users[username].password !== password) {
        playError();
        showAuthMessage('Incorrect password!', 'error');
        return;
    }

    // Login successful
    currentUser = username;
    localStorage.setItem('currentUser', username);
    playSuccess();
    showAuthMessage('Login successful!', 'success');

    setTimeout(() => {
        showAvailabilityScreen();
    }, 500);
}

function logout() {
    playClick();
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuthScreen();
}

// Admin Functions
function clearAllData() {
    playClick();
    if (confirm('⚠ WARNING ⚠\n\nThis will DELETE ALL user data, accounts, and schedules!\n\nAre you absolutely sure?')) {
        playGlitch();
        localStorage.clear();
        initializeDrBardakosAccount(); // Recreate Dr. Bardakos account
        alert('✓ All data cleared! Dr. Bardakos account has been reset.');
        location.reload();
    }
}

function showAllUsers() {
    playClick();
    const users = getUsers();
    const userList = Object.keys(users);

    if (userList.length === 0) {
        alert('No users found in system.');
        return;
    }

    let message = '═══════════════════════════════════\n';
    message += '    REGISTERED USERS DATABASE\n';
    message += '═══════════════════════════════════\n\n';

    userList.forEach((username, index) => {
        const user = users[username];
        message += `◉ USER ${index + 1}: ${username}\n`;
        message += `  Name: ${user.name || 'N/A'}\n`;
        message += `  Email: ${user.email || 'N/A'}\n`;
        message += `  Registered: ${user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : 'N/A'}\n`;
        message += `  Availability Slots: ${Object.keys(user.availability || {}).length}\n`;
        message += `\n`;
    });

    message += '═══════════════════════════════════';
    alert(message);
}

function showAuthMessage(message, type) {
    const messageDiv = document.getElementById('auth-message');
    messageDiv.textContent = message;
    messageDiv.className = 'message ' + type;
}

function clearAuthMessage() {
    document.getElementById('auth-message').textContent = '';
    document.getElementById('auth-message').className = 'message';
}

// ==================== SCREEN NAVIGATION ====================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showAuthScreen() {
    showScreen('auth-screen');
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
}

function showAvailabilityScreen() {
    showScreen('availability-screen');
    document.getElementById('welcome-user').textContent = `Welcome, ${currentUser}!`;
    generateCalendar();
    loadUserAvailability();
}

function showOptimalTimesScreen() {
    showScreen('optimal-screen');
    document.getElementById('optimal-user').textContent = `User: ${currentUser}`;
    displayOptimalTimes();
}

function backToAvailability() {
    showAvailabilityScreen();
}

// ==================== CALENDAR GENERATION ====================

function generateCalendar() {
    const container = document.getElementById('calendar-container');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({length: 10}, (_, i) => i + 9); // 9-18

    let html = '<div class="calendar-grid">';

    // Header row
    html += '<div class="time-header">Time</div>';
    days.forEach(day => {
        html += `<div class="day-header">${day}</div>`;
    });

    // Time slots
    hours.forEach(hour => {
        html += `<div class="time-cell">${hour}:00</div>`;
        days.forEach(day => {
            const slotId = `${day}-${hour}`;
            html += `<div class="time-slot" id="slot-${slotId}" data-day="${day}" data-hour="${hour}" onclick="toggleSlot('${slotId}')">
                        <span class="slot-indicator">[ ]</span>
                     </div>`;
        });
    });

    html += '</div>';
    container.innerHTML = html;
}

function toggleSlot(slotId) {
    playGlitch();
    const slot = document.getElementById(`slot-${slotId}`);
    const indicator = slot.querySelector('.slot-indicator');

    if (slot.classList.contains('selected')) {
        slot.classList.remove('selected');
        indicator.textContent = '[ ]';
    } else {
        slot.classList.add('selected');
        indicator.textContent = '[▓]';
    }
}

// ==================== AVAILABILITY MANAGEMENT ====================

function saveAvailability() {
    playClick();
    const users = getUsers();
    const availability = {};

    // Collect all selected slots
    const selectedSlots = document.querySelectorAll('.time-slot.selected');
    selectedSlots.forEach(slot => {
        const day = slot.dataset.day;
        const hour = slot.dataset.hour;
        const slotKey = `${day}-${hour}`;
        availability[slotKey] = true;
    });

    // Update user's availability
    users[currentUser].availability = availability;
    saveUsers(users);

    playSuccess();
    showAvailabilityMessage('Availability saved successfully!', 'success');
}

function loadUserAvailability() {
    const users = getUsers();
    const availability = users[currentUser]?.availability || {};

    // Clear all selections first
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
        slot.querySelector('.slot-indicator').textContent = '[ ]';
    });

    // Set saved selections
    Object.keys(availability).forEach(slotKey => {
        const slot = document.getElementById(`slot-${slotKey}`);
        if (slot && availability[slotKey]) {
            slot.classList.add('selected');
            slot.querySelector('.slot-indicator').textContent = '[▓]';
        }
    });
}

function showAvailabilityMessage(message, type) {
    const messageDiv = document.getElementById('availability-message');
    messageDiv.textContent = message;
    messageDiv.className = 'message ' + type;

    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}

function showOptimalTimes() {
    playClick();
    showOptimalTimesScreen();
}

// ==================== OPTIMAL TIMES CALCULATION ====================

function displayOptimalTimes() {
    const users = getUsers();
    const userNames = Object.keys(users);

    if (userNames.length < 2) {
        document.getElementById('optimal-times-container').innerHTML = `
            <div class="ascii-box">
                <pre>
╔════════════════════════════════════════════════════════════════╗
║  Need at least 2 users to find optimal meeting times!         ║
║  Share this app with colleagues to get started.               ║
╚════════════════════════════════════════════════════════════════╝
                </pre>
            </div>
        `;
        displayIndividualAvailabilities();
        return;
    }

    // Calculate common availability
    const commonSlots = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({length: 10}, (_, i) => i + 9);

    // Check each time slot
    days.forEach(day => {
        hours.forEach(hour => {
            const slotKey = `${day}-${hour}`;
            let allAvailable = true;

            // Check if all users are available
            for (let username of userNames) {
                const userAvailability = users[username].availability || {};
                if (!userAvailability[slotKey]) {
                    allAvailable = false;
                    break;
                }
            }

            if (allAvailable) {
                commonSlots[slotKey] = true;
            }
        });
    });

    // Display optimal times
    const container = document.getElementById('optimal-times-container');

    if (Object.keys(commonSlots).length === 0) {
        container.innerHTML = `
            <div class="ascii-box">
                <pre>
╔════════════════════════════════════════════════════════════════╗
║  No common available times found across all users!            ║
║  Users may need to adjust their availability.                 ║
╚════════════════════════════════════════════════════════════════╝
                </pre>
            </div>
        `;
    } else {
        let html = '<div class="optimal-times-list">';
        html += '<div class="ascii-box-small">';
        html += '<pre>Common Available Times (All Users):</pre>';
        html += '</div>';

        // Group by day
        const groupedByDay = {};
        Object.keys(commonSlots).forEach(slotKey => {
            const [day, hour] = slotKey.split('-');
            if (!groupedByDay[day]) {
                groupedByDay[day] = [];
            }
            groupedByDay[day].push(parseInt(hour));
        });

        // Display grouped times
        Object.keys(groupedByDay).forEach(day => {
            const hours = groupedByDay[day].sort((a, b) => a - b);
            html += `<div class="optimal-day">`;
            html += `<strong>${day}:</strong> `;
            hours.forEach(hour => {
                html += `<span class="optimal-time">${hour}:00-${hour + 1}:00</span> `;
            });
            html += `</div>`;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    displayIndividualAvailabilities();
}

function displayIndividualAvailabilities() {
    const users = getUsers();
    const container = document.getElementById('users-availability-container');

    let html = '<div class="users-list">';
    html += '<div class="ascii-box-small">';
    html += '<pre>Individual User Availabilities:</pre>';
    html += '</div>';

    Object.keys(users).forEach(username => {
        const availability = users[username].availability || {};
        const slotCount = Object.keys(availability).length;

        html += `<div class="user-availability">`;
        html += `<div class="user-name">[ ${username} ] - ${slotCount} time slots available</div>`;

        if (slotCount > 0) {
            // Group by day
            const groupedByDay = {};
            Object.keys(availability).forEach(slotKey => {
                const [day, hour] = slotKey.split('-');
                if (!groupedByDay[day]) {
                    groupedByDay[day] = [];
                }
                groupedByDay[day].push(parseInt(hour));
            });

            Object.keys(groupedByDay).forEach(day => {
                const hours = groupedByDay[day].sort((a, b) => a - b);
                html += `<div class="availability-day">`;
                html += `${day}: `;
                hours.forEach(hour => {
                    html += `${hour}:00 `;
                });
                html += `</div>`;
            });
        } else {
            html += `<div class="no-availability">No availability set</div>`;
        }

        html += `</div>`;
    });

    html += '</div>';
    container.innerHTML = html;
}

// ==================== DATA PERSISTENCE ====================

function getUsers() {
    const usersData = localStorage.getItem('meetshoggoth_users');
    return usersData ? JSON.parse(usersData) : {};
}

function saveUsers(users) {
    localStorage.setItem('meetshoggoth_users', JSON.stringify(users));
}
