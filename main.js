// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.innerHTML = navLinks.classList.contains('open') ? '✕' : '&#9776;';
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.innerHTML = '&#9776;';
    }
  });
}

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1200;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => observer.observe(el));
}

// Fade-in on scroll for cards
const cards = document.querySelectorAll('.card, .project-card, .about-block, .skill-chip, .contact-card');
if (cards.length) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, border-color 0.3s ease, box-shadow 0.3s ease`;
    cardObserver.observe(card);
  });
}

// Word count for reflection
const reflectionContent = document.querySelector('.reflection-content');
if (reflectionContent) {
  const text = reflectionContent.innerText || '';
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const wc = document.querySelector('.word-count');
  if (wc) wc.textContent = `Word count: ~${words} words`;
}
