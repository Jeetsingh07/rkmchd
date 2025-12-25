/* ============================================
   COUNTDOWN TIMER
   ============================================ */
function updateCountdown() {
  const targetDate = new Date('January 12, 2026 00:00:00').getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.event-section').forEach(section => {
  observer.observe(section);
});

/* ============================================
   HORIZONTAL SCROLL - DESKTOP ONLY
   ============================================ */
function initScrollButtons() {
  document.querySelectorAll('.gallery-container').forEach(container => {
    const gallery = container.querySelector('.horizontal-gallery');
    const leftBtn = container.querySelector('.scroll-left');
    const rightBtn = container.querySelector('.scroll-right');
    
    if (!gallery || !leftBtn || !rightBtn) return;
    
    const scrollAmount = window.innerWidth >= 992 ? 380 : 300;
    
    leftBtn.addEventListener('click', () => {
      gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    rightBtn.addEventListener('click', () => {
      gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
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
  });
}

initScrollButtons();

/* ============================================
   TOUCH SWIPE SUPPORT
   ============================================ */
document.querySelectorAll('.horizontal-gallery').forEach(gallery => {
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
});

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
const backToTop = document.getElementById('backToTop');
let scrollTimeout;

function handleScroll() {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  
  scrollTimeout = window.requestAnimationFrame(() => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      
      // Close mobile menu
      const menuToggle = document.getElementById('menu-toggle');
      if (menuToggle) menuToggle.checked = false;
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
    menuIcon.innerHTML = this.checked 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

/* ============================================
   NEWSLETTER FORM
   ============================================ */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing!\nEmail: ${email}`);
    this.reset();
  });
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */
document.querySelectorAll('.horizontal-gallery').forEach(gallery => {
  gallery.setAttribute('tabindex', '0');
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-label', 'Event gallery, use arrow keys to scroll');
  
  gallery.addEventListener('keydown', (e) => {
    const scrollAmount = 300;
    if (e.key === 'ArrowLeft') {
      gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });
});

/* ============================================
   RESIZE HANDLER
   ============================================ */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initScrollButtons();
  }, 250);
}, { passive: true });

/* ============================================
   CONSOLE MESSAGE
   ============================================ */
console.log('%c🙏 Om Namo Narayanaya 🙏', 'font-size: 20px; color: #f39c12; font-weight: bold;');
console.log('%cRKM Ashrama - Events Page', 'font-size: 14px; color: #c0392b;');