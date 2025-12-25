/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate children with delay
            const animatedChildren = entry.target.querySelectorAll('[data-delay]');
            animatedChildren.forEach(child => {
                const delay = child.getAttribute('data-delay');
                setTimeout(() => {
                    child.classList.add('visible');
                }, parseInt(delay));
            });

            // Counter animation for stats
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section, .stats-section, .quote-section').forEach(section => {
    observer.observe(section);
});

// Observe individual animated elements (excluding inspiration-card as it has its own observer)
document.querySelectorAll('.activity-card, .gallery-item, .event-card, .contact-card, .stat-item, .timings-table tr').forEach(el => {
    observer.observe(el);
});

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!target) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        };

        updateCounter();
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   SMOOTH SCROLL FOR NAVIGATION
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = window.innerWidth >= 992 ? 80 : 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle) {
                menuToggle.checked = false;
            }
            
            // Reset menu icon
            const menuIcon = document.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.querySelector('.menu-icon');

if (menuToggle && menuIcon) {
    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            menuIcon.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

/* ============================================
   ACTIVE NAVIGATION LINK HIGHLIGHTING
   ============================================ */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

/* ============================================
   INSPIRATION SECTION - HORIZONTAL SCROLL
   ============================================ */
function initInspirationScroll() {
    const container = document.querySelector('.inspiration-container');
    if (!container) return;

    const gallery = container.querySelector('.inspiration-grid');
    const leftBtn = container.querySelector('.inspiration-scroll-left');
    const rightBtn = container.querySelector('.inspiration-scroll-right');

    if (!gallery) return;

    const scrollAmount = window.innerWidth >= 992 ? 380 : 300;

    // Scroll button click handlers
    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Update button visibility
        const updateButtons = () => {
            const canScrollLeft = gallery.scrollLeft > 5;
            const canScrollRight = gallery.scrollLeft < gallery.scrollWidth - gallery.clientWidth - 5;

            leftBtn.style.opacity = canScrollLeft ? '1' : '0.4';
            leftBtn.style.pointerEvents = canScrollLeft ? 'auto' : 'none';
            rightBtn.style.opacity = canScrollRight ? '1' : '0.4';
            rightBtn.style.pointerEvents = canScrollRight ? 'auto' : 'none';
        };

        gallery.addEventListener('scroll', updateButtons, { passive: true });
        updateButtons();

        // Recalculate on resize
        window.addEventListener('resize', updateButtons, { passive: true });
    }

    // Touch swipe support
    let startX = 0;
    let scrollLeft = 0;
    let isScrolling = false;

    gallery.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = gallery.scrollLeft;
        isScrolling = true;
    }, { passive: true });

    gallery.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        const x = e.touches[0].pageX;
        const walk = (startX - x) * 1.5;
        gallery.scrollLeft = scrollLeft + walk;
    }, { passive: true });

    gallery.addEventListener('touchend', () => {
        isScrolling = false;
    }, { passive: true });

    // Mouse drag for desktop
    let isDown = false;

    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        gallery.style.cursor = 'grabbing';
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
        isDown = false;
        gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mouseup', () => {
        isDown = false;
        gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2;
        gallery.scrollLeft = scrollLeft - walk;
    });

    // Keyboard navigation
    gallery.setAttribute('tabindex', '0');
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', 'Inspiration gallery, use arrow keys to scroll');
    
    gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
}

/* ============================================
   ANIMATION OBSERVER FOR INSPIRATION CARDS
   ============================================ */
function initInspirationAnimation() {
    const inspirationSection = document.querySelector('#inspiration');
    if (!inspirationSection) return;

    const inspirationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.inspiration-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                });
                inspirationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    inspirationObserver.observe(inspirationSection);
}

/* ============================================
   GENERIC HORIZONTAL SCROLL HANDLER
   (For Activities, Events, Gallery sections)
   ============================================ */
function initHorizontalScrollSections() {
    document.querySelectorAll('.gallery-container').forEach(container => {
        const gallery = container.querySelector('.horizontal-gallery');
        const leftBtn = container.querySelector('.scroll-left');
        const rightBtn = container.querySelector('.scroll-right');

        if (!gallery) return;

        const scrollAmount = window.innerWidth >= 992 ? 380 : 300;

        // Scroll button click handlers
        if (leftBtn && rightBtn) {
            leftBtn.addEventListener('click', () => {
                gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            rightBtn.addEventListener('click', () => {
                gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            // Update button visibility
            const updateButtons = () => {
                const canScrollLeft = gallery.scrollLeft > 5;
                const canScrollRight = gallery.scrollLeft < gallery.scrollWidth - gallery.clientWidth - 5;

                leftBtn.style.opacity = canScrollLeft ? '1' : '0.4';
                leftBtn.style.pointerEvents = canScrollLeft ? 'auto' : 'none';
                rightBtn.style.opacity = canScrollRight ? '1' : '0.4';
                rightBtn.style.pointerEvents = canScrollRight ? 'auto' : 'none';
            };

            gallery.addEventListener('scroll', updateButtons, { passive: true });
            updateButtons();

            window.addEventListener('resize', updateButtons, { passive: true });
        }

        // Touch swipe support
        let startX = 0;
        let scrollLeft = 0;
        let isScrolling = false;

        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            scrollLeft = gallery.scrollLeft;
            isScrolling = true;
        }, { passive: true });

        gallery.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            const x = e.touches[0].pageX;
            const walk = (startX - x) * 1.5;
            gallery.scrollLeft = scrollLeft + walk;
        }, { passive: true });

        gallery.addEventListener('touchend', () => {
            isScrolling = false;
        }, { passive: true });

        // Mouse drag for desktop
        let isDown = false;

        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });

        // Keyboard navigation
        gallery.setAttribute('tabindex', '0');
        gallery.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });
}

/* ============================================
   PARALLAX EFFECT FOR PARTICLES
   ============================================ */
function initParallax() {
    const particles = document.querySelectorAll('.particle');
    if (particles.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.1;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
}

/* ============================================
   INITIALIZE ALL ON DOM READY
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all scroll handlers
    initInspirationScroll();
    initInspirationAnimation();
    initHorizontalScrollSections();
    initParallax();
    
    console.log('%c🙏 Om Namo Narayanaya 🙏', 'font-size: 24px; color: #f39c12; font-weight: bold;');
    console.log('%cRamakrishna Mission Ashrama, Chandigarh', 'font-size: 16px; color: #d35400;');
});

/* ============================================
   RESIZE HANDLER FOR RESPONSIVE UPDATES
   ============================================ */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize scroll handlers on resize
        initInspirationScroll();
        initHorizontalScrollSections();
    }, 250);
}, { passive: true });