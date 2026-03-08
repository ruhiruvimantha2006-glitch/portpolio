// --- 1. Projects Fetch & Render (3D Carousel) ---
const carouselContainer = document.getElementById('project-carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let allProjectsData = [];
let filteredProjectsData = [];
let currentIndex = 0;

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        allProjectsData = await response.json();
        filteredProjectsData = [...allProjectsData];

        // Initial Render
        renderCarousel();
        setupControls();
        setupFilters();

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderCarousel() {
    carouselContainer.innerHTML = '';

    filteredProjectsData.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        if (project.category === 'Graphic Design') {
            card.classList.add('graphic-design-card');
        }
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-inner-box">
                <img src="${project.image}" alt="${project.title}" class="new-card-image">
            </div>
            <div class="new-card-footer">
                <div class="new-card-user">
                    <div class="new-card-user-info">
                        <span class="new-card-description">${project.description}</span>
                    </div>
                </div>
                <a href="${project.link}" class="new-card-btn">View</a>
            </div>
        `;

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
        card.style.zIndex = '0';
        card.style.opacity = '1';
        card.style.filter = 'none';
        card.style.pointerEvents = 'auto'; // Reset pointer events

        const offset = index - currentIndex;

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
        if (currentIndex < filteredProjectsData.length - 1) {
            currentIndex++;
            updateCarouselState();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarouselState();
        } else if (e.key === 'ArrowRight' && currentIndex < filteredProjectsData.length - 1) {
            currentIndex++;
            updateCarouselState();
        }
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            
            if (filterValue === 'All') {
                filteredProjectsData = [...allProjectsData];
            } else {
                filteredProjectsData = allProjectsData.filter(p => p.category === filterValue);
            }
            
            // Reset index and re-render
            currentIndex = 0;
            renderCarousel();
        });
    });
}

// --- 2. Floating Skill Tags (Antigravity Physics) ---
const skillsContainer = document.getElementById('skills-container');
const skillsList = ['Product Design', 'Social Media', 'Motion Graphics', 'Websites', 'Logos', 'Branding', 'Copywriting', 'Mobile Apps', 'Landing Pages'];
const tags = [];

class Tag {
    constructor(text) {
        this.element = document.createElement('div');
        this.element.classList.add('skill-tag');
        this.element.innerText = text;
        skillsContainer.appendChild(this.element);

        // Random positions based on container size
        const containerW = skillsContainer.offsetWidth;
        const containerH = skillsContainer.offsetHeight;

        this.x = Math.random() * (containerW * 0.8) + (containerW * 0.1);
        this.y = Math.random() * (containerH * 0.6) + (containerH * 0.2); // Center vertically

        // Random velocity
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
    }

    update(mouseX, mouseY) {
        this.x += this.vx;
        this.y += this.vy;

        const containerW = skillsContainer.offsetWidth;
        const containerH = skillsContainer.offsetHeight;

        if (this.x < 0 || this.x > containerW - 150) this.vx *= -1;
        if (this.y < 0 || this.y > containerH - 60) this.vy *= -1;

        const rect = skillsContainer.getBoundingClientRect();
        let containerMouseX = mouseX - rect.left;
        let containerMouseY = mouseY - rect.top;

        if (mouseY > rect.top && mouseY < rect.bottom) {
            let dx = this.x - containerMouseX;
            let dy = this.y - containerMouseY;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                const angle = Math.atan2(dy, dx);
                const force = (200 - dist) / 200;
                this.vx += Math.cos(angle) * force * 0.8;
                this.vy += Math.sin(angle) * force * 0.8;
            }
        }

        this.vx *= 0.99;
        this.vy *= 0.99;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

function initTags() {
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        tags.length = 0;
        skillsList.forEach(skill => tags.push(new Tag(skill)));
    }
}

// --- 3. Particle System (Scoped to Projects) ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];

function initParticles() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// --- Main Loop & Events ---
let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Setup
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initTags();

    if (canvas) {
        initParticles();
        for (let i = 0; i < 50; i++) particles.push(new Particle());
        animateParticles();
    }

    // Game Loop for Tags
    function animateTags() {
        tags.forEach(tag => tag.update(mouse.x, mouse.y));
        requestAnimationFrame(animateTags);
    }
    animateTags();
});

window.addEventListener('resize', () => {
    initParticles();
});
