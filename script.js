/* ========================================
   JOYAL JOSEPH — PORTFOLIO SCRIPTS
   Scroll animations, filters, interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ===== LOADER =====
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  });

  // Fallback in case load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const hireMeBtn = document.getElementById('hireMeBtn');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar background
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hire Me button
    if (currentScroll > 500) {
      hireMeBtn.classList.add('visible');
    } else {
      hireMeBtn.classList.remove('visible');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ===== MOBILE MENU =====
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== FILTER TABS =====
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== SCROLL-TRIGGERED ANIMATIONS (Custom AOS) =====
  const animatedElements = document.querySelectorAll('[data-aos]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => animationObserver.observe(el));

  // ===== SKILL BAR ANIMATION =====
  const skillChips = document.querySelectorAll('.skill-chip');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillChips.forEach(chip => skillObserver.observe(chip));

  // ===== COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.dataset.count);
        let current = 0;
        const increment = countTo / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const counter = setInterval(() => {
          current += increment;
          if (current >= countTo) {
            target.textContent = countTo;
            clearInterval(counter);
          } else {
            target.textContent = Math.floor(current);
          }
        }, stepTime);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  // ===== HERO VIDEO UNMUTE =====
  const heroVideoUnmute = document.getElementById('heroVideoUnmute');
  const heroVideoWrapper = document.getElementById('heroVideoWrapper');

  if (heroVideoUnmute && heroVideoWrapper) {
    heroVideoUnmute.addEventListener('click', () => {
      const iframe = heroVideoWrapper.querySelector('iframe');
      if (iframe) {
        // Open video in new tab for full experience with sound
        window.open('https://youtube.com/shorts/eTeef27jm9w', '_blank');
      }
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      `;
      submitBtn.disabled = true;

      // Simulate sending (replace with actual form handling)
      setTimeout(() => {
        submitBtn.innerHTML = `
          <span>Message Sent! ✓</span>
        `;
        submitBtn.style.background = 'var(--success)';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 2500);
      }, 1500);
    });
  }

  // ===== LAZY LOAD IFRAMES =====
  // Only load iframes that are in viewport
  const iframeElements = document.querySelectorAll('.project-thumbnail iframe, .venture-podcast-embed iframe');
  
  const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
        iframeObserver.unobserve(iframe);
      }
    });
  }, { rootMargin: '200px' });

  // For performance, we could convert src to data-src for non-hero iframes
  // but since browsers handle lazy loading natively now, we just observe

  // ===== PARALLAX SUBTLE EFFECT ON HERO =====
  const heroSection = document.getElementById('hero');

  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        const heroContent = document.querySelector('.hero-content');
        const heroVideo = document.querySelector('.hero-video-area');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
          heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
        if (heroVideo) {
          heroVideo.style.transform = `translateY(${scrolled * 0.1}px)`;
          heroVideo.style.opacity = 1 - (scrolled / (window.innerHeight * 0.9));
        }
      }
    }, { passive: true });
  }

  // ===== ACTIVE NAV LINK BASED ON SCROLL =====
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ===== CURSOR GLOW EFFECT (DESKTOP ONLY) =====
  if (window.innerWidth > 1024) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }
});
