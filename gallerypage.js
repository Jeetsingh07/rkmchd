/**
 * ===================================
 * GALLERY PAGE JAVASCRIPT
 * Ramakrishna Mission Ashrama
 * ===================================
 */

// ===================================
// Preloader
// ===================================
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         document.getElementById('preloader').classList.add('hidden');
//     }, 800);
// });

// ===================================
// Scroll Gallery Function
// ===================================
function scrollGallery(containerId, amount) {
    const container = document.getElementById(containerId);
    container.scrollBy({
        left: amount,
        behavior: 'smooth'
    });
}

// ===================================
// Lightbox Functions
// ===================================
let currentImages = [];
let currentIndex = 0;

function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    
    // Get all images from current section
    const allCards = document.querySelectorAll('.gallery-card');
    currentImages = [];
    allCards.forEach((card, index) => {
        const imgEl = card.querySelector('.card-image img');
        const titleEl = card.querySelector('.card-content h4');
        if (imgEl) {
            currentImages.push({
                src: imgEl.src.replace('w=600', 'w=1200'),
                caption: titleEl ? titleEl.textContent : ''
            });
            if (imgEl.src.includes(src.split('?')[0].split('/').pop())) {
                currentIndex = currentImages.length - 1;
            }
        }
    });
    
    img.src = src;
    captionEl.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    
    const img = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    
    img.src = currentImages[currentIndex].src;
    captionEl.textContent = currentImages[currentIndex].caption;
}

// Close lightbox on click outside
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-section').forEach(section => {
    observer.observe(section);
});

// ===================================
// Section Navigation Active State
// ===================================
const sectionLinks = document.querySelectorAll('.section-nav a');
const sections = document.querySelectorAll('.gallery-section');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    sectionLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scroll for section navigation
sectionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 150;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Touch/Mouse Drag Scroll for Mobile
// ===================================
const scrollWrappers = document.querySelectorAll('.scroll-wrapper');

scrollWrappers.forEach(wrapper => {
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2;
        wrapper.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    wrapper.style.cursor = 'grab';
});

// ===================================
// Console Message
// ===================================
console.log('%c🙏 Om Namo Narayanaya 🙏', 'font-size: 24px; color: #b8860b; font-weight: bold;');
console.log('%cRamakrishna Mission Ashrama - Photo Gallery', 'font-size: 16px; color: #8b6914;');