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
    }
  });
}, observerOptions);

// Observe all activity sections
document.querySelectorAll('.activity-section').forEach(section => {
  observer.observe(section);
});

/* ============================================
   HORIZONTAL SCROLL BUTTONS
   ============================================ */
document.querySelectorAll('.gallery-container').forEach(container => {
  const gallery = container.querySelector('.horizontal-gallery');
  const leftBtn = container.querySelector('.scroll-left');
  const rightBtn = container.querySelector('.scroll-right');
  
  const scrollAmount = 350;
  
  leftBtn.addEventListener('click', () => {
    gallery.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
  
  rightBtn.addEventListener('click', () => {
    gallery.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Update button visibility based on scroll position
  const updateButtons = () => {
    leftBtn.style.opacity = gallery.scrollLeft > 0 ? '1' : '0.5';
    rightBtn.style.opacity = 
      gallery.scrollLeft < gallery.scrollWidth - gallery.clientWidth - 10 ? '1' : '0.5';
  };
  
  gallery.addEventListener('scroll', updateButtons);
  updateButtons();
});

/* ============================================
   TOUCH/DRAG SCROLL FOR MOBILE
   ============================================ */
document.querySelectorAll('.horizontal-gallery').forEach(gallery => {
  let isDown = false;
  let startX;
  let scrollLeft;

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
});

/* ============================================
   HERO STATS COUNTER ANIMATION
   ============================================ */
const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateHeroCounters();
      heroStatsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroStatsObserver.observe(heroStats);
}

function animateHeroCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
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

/* ============================================
   SMOOTH SCROLL FOR NAVIGATION
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu
      document.getElementById('menu-toggle').checked = false;
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
   KEYBOARD NAVIGATION FOR GALLERIES
   ============================================ */
document.querySelectorAll('.horizontal-gallery').forEach(gallery => {
  gallery.setAttribute('tabindex', '0');
  
  gallery.addEventListener('keydown', (e) => {
    const scrollAmount = 350;
    
    if (e.key === 'ArrowLeft') {
      gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });
});

/* ============================================
   PARALLAX EFFECT FOR PARTICLES
   ============================================ */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.particle').forEach((particle, index) => {
    const speed = (index + 1) * 0.1;
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/* ============================================
   CONSOLE MESSAGE
   ============================================ */
console.log('%c🙏 Om Namo Narayanaya 🙏', 'font-size: 24px; color: #f39c12; font-weight: bold;');
console.log('%cRamakrishna Mission Ashrama - Activities Page', 'font-size: 16px; color: #d35400;');
console.log('%cService to Man is Service to God', 'font-size: 14px; color: #666; font-style: italic;');