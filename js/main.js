// ============================================
// Navigation: scroll effect & active link
// ============================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

// Solid nav background on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Active section highlighting
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' });

sections.forEach(section => sectionObserver.observe(section));

// ============================================
// Mobile hamburger menu
// ============================================
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ============================================
// Scroll-triggered fade-in animations
// ============================================
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animateObserver.observe(el);
});

// ============================================
// Publication tabs
// ============================================
const pubTabs = document.querySelectorAll('.pub-tab');
const pubLists = document.querySelectorAll('.pub-list');

pubTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    pubTabs.forEach(t => t.classList.remove('active'));
    pubLists.forEach(l => l.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// ============================================
// Project filtering
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.org === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Make entire project card clickable
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const repo = card.dataset.repo;
    if (repo) {
      window.open(repo, '_blank', 'noopener');
    }
  });
});
