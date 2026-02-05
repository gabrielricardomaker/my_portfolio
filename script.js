console.log('Portfolio successfully loaded.');

//Dark Mode Toggle
const darkModeToggle = document.getElementById('darkmode-toggle');
const darkModeImg = darkModeToggle.querySelector('img');

// Check if user had dark mode enabled
if (localStorage.getItem('darkmode') === 'true') {
    document.body.classList.add('darkmode');
    darkModeImg.src = './images/lightmode.png';
    darkModeImg.alt = 'Toggle Light Mode';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
    
    const isDark = document.body.classList.contains('darkmode');
    localStorage.setItem('darkmode', isDark);
    
    // Fade out
    darkModeImg.classList.add('fade-out');
    
    setTimeout(() => {
        // Swap image
        if (isDark) {
            darkModeImg.src = './images/lightmode.png';
            darkModeImg.alt = 'Toggle Light Mode';
        } else {
            darkModeImg.src = './images/darkmode.png';
            darkModeImg.alt = 'Toggle Dark Mode';
        }
        // Fade in
        darkModeImg.classList.remove('fade-out');
    }, 500);
});
// End of Dark Mode Toggle

// Clock
let is24Hour = true; // Default to 24-hour format, if false, use 12 hr format
let clockInterval;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = '';

    if (!is24Hour) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    }

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Update or create AM/PM element
    let ampmElement = document.getElementById('ampm');
    if (ampmElement) {
        ampmElement.textContent = ampm;
        ampmElement.style.display = is24Hour ? 'none' : 'inline';
    }
    
    // Add date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en', options);
    
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.textContent = dateString;
    }
}

// Initialize clock
function initClock() {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
    console.log('Clock initialized.');
}

// Stop Clock (Avoid memory leaks)
function stopClock() { if (clockInterval) { clearInterval(clockInterval); console.log('Clock stopped.'); } }

// Toggle between 12-hour and 24-hour formats on click
function toggleFormat() {
    is24Hour = !is24Hour;
    
    localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
    updateClock();
    
    console.log(`Formato: ${is24Hour ? '24h' : '12h'}`);
}

// Button event listener
const formatToggle = document.getElementById('format-toggle');
if (formatToggle) {
    formatToggle.addEventListener('click', toggleFormat);
}

// Save/Load format preference
function loadClockFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) {
        is24Hour = (saved === '24');
    }
}

// Add to DOM
document.addEventListener('DOMContentLoaded', () => {
    loadClockFormat();
    initClock();
});
// End of Clock

// ===== Visit Counter =====

// Get Current Count
function getVisitCount() {
    // From localStorage (returns string or null)
    const count = localStorage.getItem('visitCount');
    
    // Converter para número (ou 0 se não existir)
    return count ? parseInt(count) : 0;
}

// Increment visits
function incrementVisitCount() {
    // Get current count
    let count = getVisitCount();
    
    // Increment
    count++;
    
    // Save back to localStorage
    localStorage.setItem('visitCount', count);
    
    // Save Timestamp of last visit
    const now = new Date().toISOString();
    localStorage.setItem('lastVisit', now);
    
    return count;
}

// Update display
function updateVisitDisplay() {
    const count = getVisitCount();
    
    // Update Number
    const countElement = document.getElementById('visit-count');
    if (countElement) {
        countElement.textContent = count;
    }
    
    console.log(`Visits: ${count}`);
}

// Format last visit Date
function formatLastVisit() {
    const lastVisitISO = localStorage.getItem('lastVisit');
    
    if (!lastVisitISO) {
        return 'First Time!';
    }
    
    const lastVisit = new Date(lastVisitISO);
    const now = new Date();
    
    // Calculate difference in milliseconds
    const diff = now - lastVisit;
    
    // Convert to minutes/hours/days
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Less than a minute ago';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

// Update last visit display
function updateLastVisitDisplay() {
    const lastVisitText = formatLastVisit();
    
    const lastVisitElement = document.getElementById('last-visit');
    if (lastVisitElement) {
        lastVisitElement.textContent = lastVisitText;
    }
}

// Initialize visit counter
function initVisitCounter() {
    // Increment visit count
    incrementVisitCount();
    
    // Update displays
    updateVisitDisplay();
    updateLastVisitDisplay();
    
    console.log('Visit counter initialized.');
}

// Add to DOM
document.addEventListener('DOMContentLoaded', () => {
    initVisitCounter();
});

// Reset visit counter
function resetVisitCounter() {
    // Confirmation dialog
    const confirm = window.confirm('Are you sure you want to reset the visit counter?');
    
    if (confirm) {
        // Clear localStorage
        localStorage.removeItem('visitCount');
        localStorage.removeItem('lastVisit');
        
        // Update displays
        updateVisitDisplay();
        updateLastVisitDisplay();
        
        console.log('Visit counter reset.');
        
        // Feedback to user
        alert('Successfully reset the visit counter');
    }
}

// Event listener for reset button
const resetBtn = document.getElementById('reset-counter');
if (resetBtn) {
    resetBtn.addEventListener('click', resetVisitCounter);
}