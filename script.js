console.log('Portfolio successfully loaded.');

//Dark Mode Toggle
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


// ===== DADOS DOS PROJETOS =====

// TODO: Add Real images. (#c3ff00)

const projects = [
    {
        id: 1,
        title: 'Portfolio Website',
        category: 'web',
        description: 'A personal portfolio website to showcase my projects and skills.',
        image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=E-commerce',
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
        image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Todo+App',
        tags: ['C#', '.NET 4.7', 'WinForms'],
        link: 'https://github.com/gabrielricardomaker/Minecraft-Whos-Who-Alpha',
        longDescription: 'A Minecraft-themed guessing game where players try to identify a character based on questions and clues. The game features a variety of Minecraft characters, each with unique attributes, and players can ask yes/no questions to narrow down their guesses. The current version is an alpha release, released as Source code on github. There are plans to release a more polished version in the future, with a more user-friendly interface and additional features.',
        features: ['Question-based guessing', 'Character categories', 'Categorization system', 'Badly written code'],
        technologies: ['C#', '.NET 4.7', 'WinForms'],
        date: '2026-01'
    },
    {
        id: 3,
        title: 'Magalhinux Project',
        category: 'irl',
        description: 'Complete conversion of a 2014 Magalhães laptop into a Linux machine',
        image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Portfolio',
        tags: ['Linux', 'Hardware', 'Customization'],
        longDescription: 'The culmination of more than 3 months of work converting a 2014 Magalhães laptop into a fully functional Linux machine by learning how to reconfigure the BIOS to accept Linux Sparky 8.',
        features: ['Cinnamon Desktop Environment', 'Sparky Linux', 'Apt package management', 'GRUB 0.97'],
        technologies: ['Gparted', 'Rufus', 'GRUB', 'Apt'],
        date: '2025-5'
    }
];

// Variável global para controlar filtro atual
let currentCategory = 'all';


// ===== RENDERIZAR PROJETOS =====

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

// Criar HTML de um card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;
    
    // Template string com HTML do card
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

// Atualizar números nos botões de filtro
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

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    console.log('✅ Projetos renderizados!');
});


// ===== SISTEMA DE FILTROS =====

/*
// Versão com animação de saída
function renderProjects(projectsToRender) {
    // Guardar categoria atual
    currentCategory = category;
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    
    let filteredProjects;

    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }

    // Fade out dos cards existentes
    const existingCards = grid.querySelectorAll('.project-card');
    existingCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeOut 0.3s ease forwards';
        }, index * 50);
    });
    
    // Esperar animação terminar antes de limpar
    setTimeout(() => {
        grid.innerHTML = '';
        
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
    }, existingCards.length * 50 + 300);

    // Re-renderizar com projetos filtrados
    renderProjects(filteredProjects);

    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
    
}
*/


function filterProjects(category) {
    // Guardar categoria atual
    currentCategory = category;
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    // Re-renderizar com projetos filtrados
    renderProjects(filteredProjects);
    
    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}

// ===== EVENT LISTENERS PARA FILTROS =====

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active ao clicado
            button.classList.add('active');
            
            // Obter categoria do data attribute
            const category = button.dataset.category;
            
            // Filtrar projetos
            filterProjects(category);
        });
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Filtros configurados!');
});

// ===== SISTEMA DE MODAL =====

function openModal(projectId) {
    // Encontrar projeto pelo ID
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        console.error('Projeto não encontrado!');
        return;
    }
    
    // Preencher conteúdo do modal
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        
        <div class="modal-section">
            <h3>Sobre o Projeto</h3>
            <p>${project.longDescription}</p>
        </div>
        
        <div class="modal-section">
            <h3>Funcionalidades</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        ${project.link ? `<a href="${project.link}" target="_blank" class="modal-link">
            Ver Projeto Completo →
        </a>` : ''}
    `;
    
    // Mostrar modal
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    console.log(`Modal aberto: ${project.title}`);
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    
    // Restaurar scroll
    document.body.style.overflow = 'auto';
    
    console.log('Modal fechado');
}

// ===== EVENT LISTENERS DO MODAL =====

function setupModalListeners() {
    // Event Delegation nos cards
    const grid = document.getElementById('projects-grid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            openModal(projectId);
        }
    });
    
    // Fechar modal ao clicar no X
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora (no overlay)
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Modal configurado!');
});


// ===== SISTEMA DE PESQUISA =====

function searchProjects(query) {
    // Converter query para lowercase
    const searchTerm = query.toLowerCase().trim();
    
    // Se pesquisa vazia, mostrar todos (respeitando filtro categoria)
    if (searchTerm === '') {
        filterProjects(currentCategory);
        return;
    }
    
    // Começar com projetos da categoria atual
    let baseProjects = currentCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === currentCategory);
    
    // Filtrar por termo de pesquisa
    const results = baseProjects.filter(project => {
        // Procurar em múltiplos campos
        const titleMatch = project.title.toLowerCase().includes(searchTerm);
        const descMatch = project.description.toLowerCase().includes(searchTerm);
        const tagsMatch = project.tags.some(tag => 
            tag.toLowerCase().includes(searchTerm)
        );
        
        return titleMatch || descMatch || tagsMatch;
    });
    
    // Renderizar resultados
    renderProjects(results);
    
    console.log(`Pesquisa: "${query}" - ${results.length} resultados`);
}

// ===== EVENT LISTENER PARA PESQUISA =====

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Event 'input' dispara a cada tecla pressionada
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        searchProjects(query);
    });
    
    // Limpar pesquisa com Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    setupSearchListener();  // ADICIONAR ESTA LINHA
    console.log('✅ Pesquisa configurada!');
});

// ===== DEBOUNCE PARA PESQUISA =====

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Criar versão debounced da pesquisa
const debouncedSearch = debounce(searchProjects, 300);

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Usar versão debounced
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

// Quando mudar filtro, limpar pesquisa
function filterProjects(category) {
    currentCategory = category;
    
    // Limpar input de pesquisa
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