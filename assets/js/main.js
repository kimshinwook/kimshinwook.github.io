/**
 * Main JavaScript for Portfolio Site
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initSmoothScroll();
  initScrollSpy();
  initAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isOpen);

      // Toggle icon
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Scroll Spy - Highlight Active Section in Navigation
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  updateActiveLink();
}

/**
 * Intersection Observer for Scroll Animations
 */
function initAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) return;

  const animatedElements = document.querySelectorAll('.card, .project-card, .timeline-item, .stat-card');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.5s ease forwards !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Header Shadow on Scroll
 */
(function() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
  });
})();

/**
 * Lazy Load Images (if needed)
 */
function lazyLoadImages() {
  if (!('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(function(img) {
    imageObserver.observe(img);
  });
}

/**
 * Copy Email to Clipboard (utility function)
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      showToast('Email copied to clipboard!');
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Email copied to clipboard!');
  }
}

/**
 * Simple Toast Notification
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    animation: fadeInUp 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(function() {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}
