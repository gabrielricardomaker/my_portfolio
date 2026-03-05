console.log('Portfolio successfully loaded.');

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkmode-toggle');
const darkmodeIcon = darkModeToggle.querySelector('.darkmode');
const lightmodeIcon = darkModeToggle.querySelector('.lightmode');

//populate year in footer
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

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
        image: 'images/Portfolio.png', 
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

// ===== FORM VALIDATION =====

// Validation Rules
const validationRules = {
    name: {
        required: true,
        minLength: 3,
        pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
        errorMessages: {
            required: 'Please enter your name',
            minLength: 'Name must be at least 3 characters',
            pattern: 'Name can only contain letters'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            required: 'Please enter your email',
            pattern: 'Please enter a valid email'
        }
    },


phone: {
    required: false,
    pattern: new RegExp('^(\\+351[\\s-]?)?9[0-9]{8}$'),
    errorMessages: {
        pattern: 'Format: +351 912345678 or 912345678'
    }
},

    subject: {
        required: true,
        errorMessages: {
            required: 'Please select a subject'
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 500,
        errorMessages: {
            required: 'Please write a message',
            minLength: 'Message must be at least 10 characters',
            maxLength: 'Message cannot exceed 500 characters'
        }
    }
};

// Validar campo individual
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    
    // Required
    if (rules.required && !value.trim()) {
        return {
            valid: false,
            message: rules.errorMessages.required
        };
    }
    
    // Min Length
    if (rules.minLength && value.trim().length < rules.minLength) {
        return {
            valid: false,
            message: rules.errorMessages.minLength
        };
    }
    
    // Max Length
    if (rules.maxLength && value.trim().length > rules.maxLength) {
        return {
            valid: false,
            message: rules.errorMessages.maxLength
        };
    }
    
    // Pattern (RegEx)
    if (rules.pattern && !rules.pattern.test(value)) {
        return {
            valid: false,
            message: rules.errorMessages.pattern
        };
    }
    
    // Válido!
    return {
        valid: true,
        message: ''
    };
}

// Mostrar feedback visual
function showFieldFeedback(fieldName, isValid, message = '') {
    const formGroup = document.getElementById(fieldName).closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Remover estados anteriores
    formGroup.classList.remove('valid', 'invalid');
    
    // Adicionar novo estado
    if (isValid) {
        formGroup.classList.add('valid');
        errorElement.textContent = '';
    } else {
        formGroup.classList.add('invalid');
        errorElement.textContent = message;
    }
}
// ===== EVENT LISTENERS =====

function setupFormValidation() {
    const form = document.getElementById('contact-form');
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    
    // Validar cada campo ao perder foco (blur)
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        
        field.addEventListener('blur', () => {
            const validation = validateField(fieldName, field.value);
            showFieldFeedback(fieldName, validation.valid, validation.message);
            updateSubmitButton();
        });
        
        // Validar enquanto escreve (para limpar erros)
        field.addEventListener('input', () => {
            // Só valida se já tinha erro
            const formGroup = field.closest('.form-group');
            if (formGroup.classList.contains('invalid')) {
                const validation = validateField(fieldName, field.value);
                showFieldFeedback(fieldName, validation.valid, validation.message);
                updateSubmitButton();
            }
        });
    });
}

// Validar form inteiro
function validateForm() {
    const fields = ['name', 'email', 'subject', 'message'];
    let isFormValid = true;
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const validation = validateField(fieldName, field.value);
        
        showFieldFeedback(fieldName, validation.valid, validation.message);
        
        if (!validation.valid) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

// Atualizar estado do botão submit
function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    const isValid = validateForm();
    
    submitBtn.disabled = !isValid;
}

// ===== CONTADOR DE CARACTERES =====

function setupCharCounter() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const counter = document.querySelector('.char-counter');
    const maxLength = 500;
    
    messageField.addEventListener('input', () => {
        const length = messageField.value.length;
        charCount.textContent = length;
        
        // Remover classes anteriores
        counter.classList.remove('warning', 'error');
        
        // Adicionar warning quando >400 caracteres
        if (length > 400 && length <= maxLength) {
            counter.classList.add('warning');
        }
        
        // Adicionar error quando >maxLength
        if (length > maxLength) {
            counter.classList.add('error');
        }
    });
}

// ===== TOAST NOTIFICATIONS =====

function clearAllToasts() {
    const container = document.getElementById('toast-container');
    const toasts = container.querySelectorAll('.toast');
    toasts.forEach(toast => {
        toast.style.animation = 'fadeOut 0.2s ease forwards';
        setTimeout(() => toast.remove(), 200);
    });
}

function showToast(type, title, message, duration = 3000) {
    const container = document.getElementById('toast-container');
    
    // Clear existing toasts
    clearAllToasts();
    
    // Ícones por tipo
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    // Criar toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">×</button>
    `;
    
    // Adicionar ao container
    container.appendChild(toast);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'fadeOut 0.2s ease forwards';
        setTimeout(() => toast.remove(), 200);
    });
    
    // Auto-remove após duration
    const timeoutId = setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'fadeOut 0.2s ease forwards';
            setTimeout(() => toast.remove(), 200);
        }
    }, duration);
    
    // Store timeout ID for cleanup
    toast.dataset.timeoutId = timeoutId;
    
    console.log(`Toast ${type}: ${title}`);
}

// ===== MENSAGENS EM LOCALSTORAGE =====

function saveMessageToStorage(formData) {
    // Get existing messages
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    // Add new message with timestamp
    const newMessage = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    return newMessage;
}

function loadMessagesFromStorage() {
    return JSON.parse(localStorage.getItem('contactMessages')) || [];
}

function displayMessages() {
    const messages = loadMessagesFromStorage();
    const messagesList = document.querySelector('.messages-list');
    
    if (!messagesList) return;
    
    if (messages.length === 0) {
        messagesList.innerHTML = '<div class="no-messages">No messages yet</div>';
        return;
    }
    
    messagesList.innerHTML = messages.map(msg => {
        const date = new Date(msg.timestamp);
        const formattedDate = date.toLocaleDateString('pt-PT') + ' ' + date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="message-item">
                <div class="message-header">
                    <h4>${msg.name}</h4>
                    <small>${formattedDate}</small>
                </div>
                <p class="message-email"><strong>Email:</strong> ${msg.email}</p>
                ${msg.phone ? `<p class="message-email"><strong>Phone:</strong> ${msg.phone}</p>` : ''}
                <p class="message-subject"><strong>Subject:</strong> ${msg.subject}</p>
                <div class="message-content">${msg.message}</div>
                <button class="delete-message-btn" onclick="deleteMessage(${msg.id})">🗑️ Delete</button>
            </div>
        `;
    }).join('');
}

function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        let messages = loadMessagesFromStorage();
        messages = messages.filter(msg => msg.id !== id);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        displayMessages();
        showToast('success', 'Deleted!', 'Message deleted successfully');
    }
}

function clearAllMessages() {
    if (confirm('Are you sure you want to delete ALL messages? This action cannot be undone!')) {
        localStorage.removeItem('contactMessages');
        displayMessages();
        showToast('success', 'Cleared!', 'All messages have been deleted');
    }
}

// ===== PROCESSAR SUBMIT =====

function setupFormSubmit() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form final
        if (!validateForm()) {
            showToast('error', 'Error!', 'Please correct the errors in the form');
            return;
        }
        
        // Desativar botão e mostrar loading
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        try {
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Obter dados do formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Salvar em localStorage
            saveMessageToStorage(formData);
            
            // Log da mensagem enviada
            console.log(`Message sent: ${formData.message}`);
            
            // Atualizar display de mensagens
            displayMessages();
            
            // Update admin panel
            loadMessages();
            
            // Success!
            showToast(
                'success',
                'Message Sent!',
                'Thank you for reaching out. I\'ll get back to you soon!'
            );
            
            // Clear form
            form.reset();
            
            // Remove validation states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('valid', 'invalid');
            });
            
            // Reset counter
            document.getElementById('char-count').textContent = '0';
            
        } catch (error) {
            showToast(
                'error',
                'Error Sending',
                'An error occurred. Please try again.'
            );
            console.error('Form submission error:', error);
        } finally {
            // Reactivate button and remove loading
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
}

// ===== ADMIN VIEW =====

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const messagesList = document.getElementById('messages-list');
    const noMessages = document.getElementById('no-messages');
    const totalMessages = document.getElementById('total-messages');
    const unreadBadge = document.getElementById('unread-badge');
    
    // Atualizar contador
    totalMessages.textContent = messages.length;
    
    // Contar não lidas
    const unreadCount = messages.filter(m => !m.read).length;
    if (unreadCount > 0) {
        unreadBadge.textContent = unreadCount;
        unreadBadge.style.display = 'flex';
    } else {
        unreadBadge.style.display = 'none';
    }
    
    // Mostrar/esconder mensagens
    if (messages.length === 0) {
        messagesList.style.display = 'none';
        noMessages.style.display = 'block';
        return;
    }
    
    messagesList.style.display = 'flex';
    noMessages.style.display = 'none';
    
    // Renderizar mensagens
    messagesList.innerHTML = messages.map(msg => {
        const date = new Date(msg.timestamp);
        return `
            <div class="message-item">
                <div class="message-header">
                    <h4>${msg.name}</h4>
                    <small>${date.toLocaleDateString('pt-PT')} ${date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
                <p class="message-email"><strong>Email:</strong> ${msg.email}</p>
                ${msg.phone ? `<p class="message-email"><strong>Phone:</strong> ${msg.phone}</p>` : ''}
                <p class="message-subject"><strong>Subject:</strong> ${msg.subject}</p>
                <div class="message-content">${msg.message}</div>
                <button class="delete-message-btn" onclick="deleteMessage(${msg.id})">🗑️ Delete</button>
            </div>
        `;
    }).join('');
}

function deleteMessage(id) {
    if (!confirm('Delete this message?')) return;
    
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages = messages.filter(m => m.id !== id);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    loadMessages();
    showToast('success', 'Deleted!', 'Message removed successfully');
}

function clearAllMessages() {
    if (!confirm('Delete ALL messages? This action cannot be undone!')) return;
    
    localStorage.removeItem('contactMessages');
    loadMessages();
    showToast('success', 'Cleared!', 'All messages have been removed');
}

// Toggle admin view
function setupAdminToggle() {
    const toggleBtn = document.getElementById('toggle-admin');
    const adminSection = document.getElementById('admin-messages');
    let isVisible = false;
    
    toggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        adminSection.style.display = isVisible ? 'block' : 'none';
        
        if (isVisible) {
            loadMessages();
            // Scroll para admin
            adminSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Limpar todas - melhorado para funcionar com o novo botão
const clearAllBtn = document.getElementById('clear-messages');
if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllMessages);
}

// ===== GITHUB API INTEGRATION =====

const GITHUB_USERNAME = 'gabrielricardomaker'; // ALTERAR PARA O TEU USERNAME!


// Atualizar stats no DOM
function updateGitHubStats(userData) {
    document.getElementById('repos-count').textContent = userData.public_repos;
    document.getElementById('followers-count').textContent = userData.followers;
    document.getElementById('following-count').textContent = userData.following;
    
    // Remover classe loading
    document.querySelectorAll('.stat-value').forEach(el => {
        el.classList.remove('loading');
    });
}

// Buscar repositórios do utilizador
async function fetchGitHubRepos() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`
        );
        
        if (response.status === 403) {
            console.error('Rate limited. Try again in 1 hour.');
        }
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        
        return await response.json();
    } catch (error) {
        console.error('❌ Error:', error);
        return [];
    }
}

// Calcular total de stars
async function calculateTotalStars() {
    try {
        const repos = await fetchGitHubRepos();
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        document.getElementById('stars-count').textContent = totalStars;
        
        return repos;
    } catch (error) {
        document.getElementById('stars-count').textContent = '0';
        throw error;
    }
}

// Renderizar repositórios
function renderRepos(repos) {
    const grid = document.getElementById('repos-grid');
    
    grid.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <div class="repo-header">
                <div class="repo-icon">📦</div>
                <div class="repo-info">
                    <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                </div>
            </div>
            <p class="repo-description">${repo.description || 'No description'}</p>
            <div class="repo-stats">
                <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
                <span class="repo-stat">🔀 ${repo.forks_count}</span>
            </div>
            ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
        </div>
    `).join('');
}

// Atualizar fetchGitHubUserData para usar cache
async function fetchGitHubUserData() {
    const cacheKey = `github_user_${GITHUB_USERNAME}`;
    
    // Tentar obter do cache primeiro
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    // Se não tem cache, buscar da API
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Guardar no cache
        setCachedData(cacheKey, data);
        
        return data;
    } catch (error) {
        console.error('❌ Erro ao buscar GitHub user:', error);
        throw error;
    }
}

// ===== INICIALIZAR GITHUB STATS =====

async function initGitHubStats() {
    console.log('🐙 Carregando GitHub stats...');
    
    try {
        // Buscar dados em paralelo
        const [userData, repos] = await Promise.all([
            fetchGitHubUserData(),
            calculateTotalStars()
        ]);
        
        // Atualizar UI
        updateGitHubStats(userData);
        renderRepos(repos);
        
        console.log('✅ GitHub stats carregados!');
        
    } catch (error) {
        console.error('❌ Erro ao carregar GitHub stats:', error.message);
        // Mostrar erro na UI
        document.querySelectorAll('.stat-value').forEach(el => {
            el.textContent = '--';
            el.classList.remove('loading');
        });
    }
}

// ===== CACHE SIMPLES =====

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

function getCachedData(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // Verificar se cache ainda é válido
    if (now - timestamp < CACHE_DURATION) {
        console.log(`✅ Usando cache para ${key}`);
        return data;
    }
    
    // Cache expirado
    localStorage.removeItem(key);
    return null;
}

function setCachedData(key, data) {
    const cacheObj = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheObj));
}



// ===== RETRY LOGIC =====

async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return response;
            
        } catch (error) {
            // Última tentativa - lançar erro
            if (i === maxRetries - 1) {
                throw error;
            }
            
            // Esperar antes de retry (exponential backoff)
            const delay = Math.pow(2, i) * 1000;
            console.log(`Retry ${i + 1}/${maxRetries} após ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}


//weather API integration

// ===== WEATHER WIDGET =====

const OPENWEATHER_API_KEY = '34609a7d0b3b000f76c942f57fe0889b';
const DEFAULT_CITY = 'Lisbon'; // Cidade padrão se geolocalização falhar

// Mapeamento de códigos para emojis
const weatherIcons = {
    '01d': '☀️',  // clear sky day
    '01n': '🌙',  // clear sky night
    '02d': '⛅',  // few clouds day
    '02n': '☁️',  // few clouds night
    '03d': '☁️',  // scattered clouds
    '03n': '☁️',
    '04d': '☁️',  // broken clouds
    '04n': '☁️',
    '09d': '🌧️',  // shower rain
    '09n': '🌧️',
    '10d': '🌦️',  // rain day
    '10n': '🌧️',  // rain night
    '11d': '⛈️',  // thunderstorm
    '11n': '⛈️',
    '13d': '❄️',  // snow
    '13n': '❄️',
    '50d': '🌫️',  // mist
    '50n': '🌫️'
};

// Buscar meteorologia por cidade
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Weather data:', data);
        
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar meteorologia:', error);
        throw error;
    }
}

// Buscar meteorologia por coordenadas
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar meteorologia:', error);
        throw error;
    }
}

// ===== ERROR HANDLING AVANÇADO =====

// Função para lidar com erros de API
function handleAPIError(error, apiName) {
    console.error(`❌ Erro na ${apiName} API:`, error);
    
    // Diferentes tipos de erro
    if (error.message.includes('Failed to fetch')) {
        showToast('error', 'Sem Conexão', `Verifica a tua ligação à internet`);
    } else if (error.message.includes('404')) {
        showToast('error', 'Não Encontrado', `${apiName}: Recurso não encontrado`);
    } else if (error.message.includes('429')) {
        showToast('error', 'Rate Limit', `${apiName}: Muitos pedidos. Tenta mais tarde.`);
    } else if (error.message.includes('403')) {
        showToast('error', 'Acesso Negado', `${apiName}: Verifica API key`);
    } else {
        showToast('error', 'Erro', `${apiName}: ${error.message}`);
    }
}


// Atualizar UI do widget
function updateWeatherWidget(data) {
    const widget = document.getElementById('weather-widget');
    const loading = widget.querySelector('.weather-loading');
    const content = widget.querySelector('.weather-content');
    const error = widget.querySelector('.weather-error');
    
    // Esconder loading e error
    loading.style.display = 'none';
    error.style.display = 'none';
    
    // Atualizar dados
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('weather-location').textContent = data.name;
    
    // Atualizar ícone
    const iconCode = data.weather[0].icon;
    const icon = weatherIcons[iconCode] || '🌈';
    document.getElementById('weather-icon').textContent = icon;
    
    // Mostrar content
    content.style.display = 'flex';
}

// Mostrar erro
function showWeatherError() {
    const widget = document.getElementById('weather-widget');
    widget.querySelector('.weather-loading').style.display = 'none';
    widget.querySelector('.weather-content').style.display = 'none';
    widget.querySelector('.weather-error').style.display = 'block';
}

// ===== INICIALIZAR WEATHER WIDGET =====

async function initWeatherWidget() {
    console.log('🌤️ Carregando meteorologia...');
    
    try {
        // Tentar obter localização do utilizador
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Sucesso
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherByCoords(latitude, longitude);
                    updateWeatherWidget(data);
                },
                // Erro ou negado
                async (error) => {
                    console.log('Geolocalização negada, usando cidade padrão');
                    const data = await fetchWeatherByCity(DEFAULT_CITY);
                    updateWeatherWidget(data);
                }
            );
        } else {
            // Browser não suporta geolocalização
            const data = await fetchWeatherByCity(DEFAULT_CITY);
            updateWeatherWidget(data);
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar meteorologia');
        showWeatherError();
    }
}





// THIS NEEDS TO BE THE LAST THING IN THE FILE, OTHERWISE IT BREAKS EVERYTHING ELSE
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
    setupFormValidation();
    setupCharCounter();
    setupFormSubmit();
    
    // Messages
    displayMessages();
    const clearMessagesBtn = document.querySelector('.clear-messages-btn');
    if (clearMessagesBtn) {
        clearMessagesBtn.addEventListener('click', clearAllMessages);
    }
    
    setupAdminToggle();
    loadMessages(); // Load initial count
    initGitHubStats();
    initWeatherWidget()
    updateFooterYear();

    console.log('✅ Filters configured!');
    console.log('✅ Modal configured!');
    console.log('✅ Search configured!');
    console.log('✅ Form validation configured!');
    console.log('✅ Character counter active!');
    console.log('✅ Form submit configured!');
    console.log('✅ Messages and toasts configured!');
    console.log('✅ Admin view configured!');
    console.log('✅ GitHub stats configured!');
});