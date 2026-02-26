console.log('Portfolio successfully loaded.');

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkmode-toggle');
const darkmodeIcon = darkModeToggle.querySelector('.darkmode');
const lightmodeIcon = darkModeToggle.querySelector('.lightmode');

// Check if user had dark mode enabled
if (localStorage.getItem('darkmode') === 'true') {
    document.body.classList.add('darkmode');
    darkmodeIcon.classList.add('fade-out');
    lightmodeIcon.style.display = 'block';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
    
    const isDark = document.body.classList.contains('darkmode');
    localStorage.setItem('darkmode', isDark);
    
    if (isDark) {
        darkmodeIcon.classList.add('fade-out');
        lightmodeIcon.style.display = 'block';
        lightmodeIcon.classList.remove('fade-out');
    } else {
        lightmodeIcon.classList.add('fade-out');
        darkmodeIcon.classList.remove('fade-out');
    }
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
    
    console.log(`Format: ${is24Hour ? '24h' : '12h'}`);
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

// ===== Visit Counter =====

// Get Current Count
function getVisitCount() {
    // From localStorage (returns string or null)
    const count = localStorage.getItem('visitCount');
    
    // Convert to number (or 0 if it doesn't exist)
    return count ? parseInt(count) : 0;
}

// Increment visits
function incrementVisitCount() {
    let count = getVisitCount();
    count++;
    localStorage.setItem('visitCount', count);
    
    // Save current time as the new last visit
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

// Format last visit time
function formatLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (!lastVisit) {
        return 'First Time!';
    }
    
    const lastVisitTime = new Date(lastVisit);
    const now = new Date();
    const diffMs = now - lastVisitTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Less than a minute ago';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// Update last visit display
function updateLastVisitDisplay() {
    const lastVisitSpan = document.getElementById('last-visit');
    if (lastVisitSpan) {
        lastVisitSpan.textContent = formatLastVisit();
    }
}

// Initialize visit counter
function initVisitCounter() {
    // Increment visit count
    incrementVisitCount();
    
    // Update displays
    updateVisitDisplay();
    updateLastVisitDisplay();
    
    // Update last visit live every minute
    setInterval(updateLastVisitDisplay, 60000);
    
    console.log('Visit counter initialized.');
}

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

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link  => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== PROJECT DATA =====

const projects = [
    {
        id: 1,
        title: 'Portfolio Website',
        category: 'web',
        description: 'A personal portfolio website to showcase my projects and skills.',
        image: 'images/portfolio.png', 
        tags: ['HTML', 'CSS', 'JavaScript', 'API'],
        link: 'https://github.com/gabrielricardomaker/my_portfolio',
        longDescription: 'This site itself is a project! Built with vanilla JavaScript, it features a dynamic project gallery, filtering, search, and a custom modal for project details.',
        features: ['Tag filtering', 'Search functionality', 'Dark mode toggle', 'Responsive design'],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
        date: '2026-02'
    },
    {
        id: 2,
        title: 'Minecraft Guess Who Fangame',
        category: 'app',
        description: 'A Minecraft-themed guessing game where players try to identify a character based on questions and clues.',
        image: 'images/McFg.png',  // will point to local file once added
        tags: ['C#', '.NET 4.7', 'WinForms'],
        link: 'https://github.com/gabrielricardomaker/Minecraft-Whos-Who-Alpha',
        longDescription: 'A Minecraft-themed guessing game where players try to identify a character based on questions and clues. The game features a variety of Minecraft characters, each with unique attributes, and players can ask yes/no questions to narrow down their guesses. The current version is an alpha release, released as Source code on github. There are plans to release a more polished version in the future, with a more user-friendly interface and additional features.',
        features: ['Question-based guessing', 'Character categories', 'Categorization system', 'Badly written code', 'A Homage to both an influential game and a beloved YouTuber'],
        technologies: ['C#', '.NET 4.7', 'WinForms'],
        date: '2026-01'
    },
    {
        id: 3,
        title: 'Magalhinux Project',
        category: 'irl',
        description: 'Complete conversion of a 2014 Magalhães laptop into a Linux machine',
        image: 'https://pt.static.webuy.com/product_images/Inform%C3%A1tica/Port%C3%A1teis%20-%20Windows/SPORMAGMG10T120B_l.jpg',
        tags: ['Linux', 'Hardware', 'Customization'],
        longDescription: 'The culmination of more than 3 months of work converting a 2014 Magalhães laptop into a fully functional Linux machine by learning how to reconfigure the BIOS to accept Linux Sparky 8.',
        features: ['Cinnamon Desktop Environment', 'Sparky Linux', 'Apt package management', 'GRUB 0.97'],
        technologies: ['Gparted', 'Rufus', 'GRUB', 'Apt'],
        date: '2025-5'
    }
];

// Global variable to control current filter
let currentCategory = 'all';

// ===== RENDER PROJECTS =====

function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    
    // Fade out existing cards before clearing
    const existingCards = grid.querySelectorAll('.project-card');
    if (existingCards.length > 0) {
        existingCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeOut 0.3s ease forwards';
            }, index * 30);
        });
        
        // Wait for animation to finish before clearing
        setTimeout(() => {
            grid.innerHTML = '';
            renderNewCards();
        }, existingCards.length * 30 + 300);
    } else {
        renderNewCards();
    }
    
    function renderNewCards() {
        if (projectsToRender.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        projectsToRender.forEach(project => {
            const card = createProjectCard(project);
            grid.appendChild(card);
        });
        
        updateCounters();
    }
}

// Create HTML for a card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;
    
    // Template string with card HTML
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-card-body">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Update numbers on filter buttons
function updateCounters() {
    const allCount = projects.length;
    const webCount = projects.filter(p => p.category === 'web').length;
    const mobileCount = projects.filter(p => p.category === 'mobile').length;
    const designCount = projects.filter(p => p.category === 'design').length;
    const appCount = projects.filter(p => p.category === 'app').length;
    const irlCount = projects.filter(p => p.category === 'irl').length;
    
    document.querySelector('[data-category="all"] .count').textContent = allCount;
    document.querySelector('[data-category="web"] .count').textContent = webCount;
    document.querySelector('[data-category="mobile"] .count').textContent = mobileCount;
    document.querySelector('[data-category="design"] .count').textContent = designCount;
    document.querySelector('[data-category="app"] .count').textContent = appCount;
    document.querySelector('[data-category="irl"] .count').textContent = irlCount;
}

// ===== FILTER SYSTEM =====

function filterProjects(category) {
    // Save current category
    currentCategory = category;
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    // Re-render with filtered projects
    renderProjects(filteredProjects);
    
    console.log(`Filter applied: ${category} (${filteredProjects.length} projects)`);
}

// ===== EVENT LISTENERS FOR FILTERS =====

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked
            button.classList.add('active');
            
            // Get category from data attribute
            const category = button.dataset.category;
            
            // Filter projects
            filterProjects(category);
        });
    });
}

// ===== MODAL SYSTEM =====

function openModal(projectId) {
    // Find project by ID
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        console.error('Project not found!');
        return;
    }
    
    // Fill modal content
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        
        <div class="modal-section">
            <h3>About the Project</h3>
            <p>${project.longDescription}</p>
        </div>
        
        <div class="modal-section">
            <h3>Features</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Technologies Used</h3>
            <div class="modal-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        ${project.link ? `<a href="${project.link}" target="_blank" class="modal-link">
            View Full Project →
        </a>` : ''}
    `;
    
    // Show modal
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    console.log(`Modal opened: ${project.title}`);
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    
    // Restore scroll
    document.body.style.overflow = 'auto';
    
    console.log('Modal closed');
}

// ===== MODAL EVENT LISTENERS =====

function setupModalListeners() {
    // Event Delegation on cards
    const grid = document.getElementById('projects-grid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            openModal(projectId);
        }
    });
    
    // Close modal when clicking X
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside (overlay)
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ===== SEARCH SYSTEM =====

function searchProjects(query) {
    // Convert query to lowercase
    const searchTerm = query.toLowerCase().trim();
    
    // If empty search, show all (respecting category filter)
    if (searchTerm === '') {
        filterProjects(currentCategory);
        return;
    }
    
    // Start with projects from current category
    let baseProjects = currentCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === currentCategory);
    
    // Filter by search term
    const results = baseProjects.filter(project => {
        // Search in multiple fields
        const titleMatch = project.title.toLowerCase().includes(searchTerm);
        const descMatch = project.description.toLowerCase().includes(searchTerm);
        const tagsMatch = project.tags.some(tag => 
            tag.toLowerCase().includes(searchTerm)
        );
        
        return titleMatch || descMatch || tagsMatch;
    });
    
    // Render results
    renderProjects(results);
    
    console.log(`Search: "${query}" - ${results.length} results`);
}

// ===== EVENT LISTENER FOR SEARCH =====

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Use debounced version
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        debouncedSearch(query);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}

// ===== DEBOUNCE FOR SEARCH =====

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Create debounced version of search
const debouncedSearch = debounce(searchProjects, 300);

// Clear search when category filter is applied
function filterProjects(category) {
    currentCategory = category;
    
    // Clear search input

    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    renderProjects(filteredProjects);
    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}

// Scroll to top functionality
const btn = document.getElementById('scroll-top');

// Show button when scroll > 300px
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

// Smooth scroll to top
btn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== CONSOLIDATED DOM CONTENT LOADED =====

document.addEventListener('DOMContentLoaded', () => {
    // Clock
    loadClockFormat();
    initClock();
    
    // Visit Counter
    initVisitCounter();
    
    // Projects
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    setupSearchListener();
    
    // Contact Form
    setupContactForm();

    console.log('✅ Filters configured!');
    console.log('✅ Modal configured!');
    console.log('✅ Search configured!');
    console.log('✅ All features initialized!');
});

// ===== CONTACT FORM =====

// Form validation rules
const formRules = {
    name: {
        minLength: 2,
        maxLength: 50,
        regex: /^[a-zA-Z\s'-]+$/,
        message: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes'
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    subject: {
        minLength: 3,
        maxLength: 100,
        message: 'Subject must be 3-100 characters'
    },
    message: {
        minLength: 10,
        maxLength: 1000,
        message: 'Message must be 10-1000 characters'
    }
};

function validateField(fieldName, value) {
    const rules = formRules[fieldName];
    if (!rules) return true;
    if (rules.minLength && value.length < rules.minLength) return false;
    if (rules.maxLength && value.length > rules.maxLength) return false;
    if (rules.regex && !rules.regex.test(value)) return false;
    return true;
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function getAllMessages() {
    const messages = localStorage.getItem('contactMessages');
    return messages ? JSON.parse(messages) : [];
}

function saveMessage(messageData) {
    const messages = getAllMessages();
    messageData.id = Date.now();
    messageData.timestamp = new Date().toISOString();
    messages.push(messageData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    return messageData;
}

function deleteMessage(messageId) {
    let messages = getAllMessages();
    messages = messages.filter(msg => msg.id !== messageId);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

function clearAllMessages() {
    const confirmed = window.confirm('Are you sure you want to delete all messages? This cannot be undone.');
    if (confirmed) {
        localStorage.removeItem('contactMessages');
        renderMessagesList();
        console.log('All messages cleared.');
    }
}

function renderMessagesList() {
    const messagesList = document.getElementById('messages-list');
    const clearBtn = document.getElementById('clear-messages');
    const messages = getAllMessages();
    
    if (messages.length === 0) {
        messagesList.innerHTML = '<p class="no-messages">No messages saved yet.</p>';
        clearBtn.style.display = 'none';
        return;
    }
    
    clearBtn.style.display = 'block';
    
    messagesList.innerHTML = messages.map(msg => {
        const date = new Date(msg.timestamp).toLocaleString();
        return `
            <div class="message-item">
                <div class="message-header">
                    <h4>${msg.name}</h4>
                    <small>${date}</small>
                </div>
                <p class="message-subject"><strong>Subject:</strong> ${msg.subject}</p>
                <p class="message-email"><strong>Email:</strong> <a href="mailto:${msg.email}">${msg.email}</a></p>
                <p class="message-content">${msg.message}</p>
                <button class="delete-message-btn" data-id="${msg.id}">🗑️ Delete</button>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.delete-message-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const messageId = parseInt(e.target.dataset.id);
            deleteMessage(messageId);
            renderMessagesList();
            console.log('Message deleted.');
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            const fieldName = field.name;
            const value = field.value.trim();
            
            if (value === '') {
                showError(fieldName, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            } else if (!validateField(fieldName, value)) {
                showError(fieldName, formRules[fieldName].message);
            } else {
                clearError(fieldName);
            }
        });
        
        field.addEventListener('focus', () => {
            clearError(field.name);
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        let isValid = true;
        
        Object.keys(formData).forEach(fieldName => {
            if (formData[fieldName] === '') {
                showError(fieldName, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
                isValid = false;
            } else if (!validateField(fieldName, formData[fieldName])) {
                showError(fieldName, formRules[fieldName].message);
                isValid = false;
            } else {
                clearError(fieldName);
            }
        });
        
        if (isValid) {
            saveMessage(formData);
            
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = '✅ Message saved successfully!';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            form.reset();
            renderMessagesList();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 3000);
            
            console.log('Message saved:', formData);
        } else {
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = '❌ Please fix the errors above';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        }
    });
    
    const clearBtn = document.getElementById('clear-messages');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllMessages);
    }
    
    renderMessagesList();
    console.log('✅ Contact form initialized!');
}

// ===== END CONTACT FORM =====