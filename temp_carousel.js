// --- 1. Projects Fetch & Render (3D Carousel) ---
const carouselContainer = document.getElementById('project-carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let projectsData = [];
let currentIndex = 0;

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        projectsData = await response.json();

        // Initial Render
        renderCarousel();
        setupControls();

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderCarousel() {
    carouselContainer.innerHTML = '';

    projectsData.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        // Store index for clicking logic
        card.dataset.index = index;

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="card-image">
            <div class="card-content">
                <div class="card-category">${project.category}</div>
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.description}</p>
            </div>
        `;

        // Add click listener to center clicked card
        card.addEventListener('click', () => {
            currentIndex = index;
            updateCarouselState();
        });

        carouselContainer.appendChild(card);
    });

    updateCarouselState();
}

function updateCarouselState() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        // Calculate reset styles first
        card.style.zIndex = '0';
        card.style.opacity = '1';
        card.style.filter = 'none';

        const offset = index - currentIndex;

        // Determine properties based on offset
        if (offset === 0) {
            // Center Item
            card.style.transform = 'translateX(0) scale(1) translateZ(100px)';
            card.style.zIndex = '100';
            card.style.filter = 'brightness(1.2)';
            card.style.opacity = '1';
        } else if (offset === 1) {
            // Right 1
            card.style.transform = 'translateX(60%) scale(0.8) perspective(1000px) rotateY(-30deg)';
            card.style.zIndex = '90';
            card.style.filter = 'brightness(0.6)';
            card.style.opacity = '0.7';
        } else if (offset === -1) {
            // Left 1
            card.style.transform = 'translateX(-60%) scale(0.8) perspective(1000px) rotateY(30deg)';
            card.style.zIndex = '90';
            card.style.filter = 'brightness(0.6)';
            card.style.opacity = '0.7';
        } else if (offset === 2) {
            // Right 2
            card.style.transform = 'translateX(100%) scale(0.6) perspective(1000px) rotateY(-45deg)';
            card.style.zIndex = '80';
            card.style.filter = 'brightness(0.4)';
            card.style.opacity = '0.5';
        } else if (offset === -2) {
            // Left 2
            card.style.transform = 'translateX(-100%) scale(0.6) perspective(1000px) rotateY(45deg)';
            card.style.zIndex = '80';
            card.style.filter = 'brightness(0.4)';
            card.style.opacity = '0.5';
        } else {
            // Hidden/Far
            card.style.transform = 'scale(0.5) translateZ(-200px)';
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
            card.style.zIndex = '0';
        }
    });
}

function setupControls() {
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselState();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < projectsData.length - 1) {
            currentIndex++;
            updateCarouselState();
        }
    });

    // Arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarouselState();
        } else if (e.key === 'ArrowRight' && currentIndex < projectsData.length - 1) {
            currentIndex++;
            updateCarouselState();
        }
    });
}

// Reuse existing particle and skills logic
// ... (Tag and Particle System logic remains same)
