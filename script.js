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

// ===== VALIDAÇÃO DO FORMULÁRIO =====

// Regras de validação
const validationRules = {
    name: {
        required: true,
        minLength: 3,
        pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
        errorMessages: {
            required: 'Por favor, introduz o teu nome',
            minLength: 'O nome deve ter pelo menos 3 caracteres',
            pattern: 'O nome só pode conter letras'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            required: 'Por favor, introduz o teu email',
            pattern: 'Por favor, introduz um email válido'
        }
    },


phone: {
    required: false,
    pattern: new RegExp('^(\\+351[\\s-]?)?9[0-9]{8}$'),
    errorMessages: {
        pattern: 'Formato: +351 912345678 ou 912345678'
    }
},

    subject: {
        required: true,
        errorMessages: {
            required: 'Por favor, seleciona um assunto'
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 500,
        errorMessages: {
            required: 'Por favor, escreve uma mensagem',
            minLength: 'A mensagem deve ter pelo menos 10 caracteres',
            maxLength: 'A mensagem não pode ter mais de 500 caracteres'
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
    
    console.log('✅ Filters configured!');
    console.log('✅ Modal configured!');
    console.log('✅ Search configured!');
    console.log('✅ Validação configurada');
    console.log('✅ Contador de caracteres ativo');
    console.log('✅ All features initialized!');
});