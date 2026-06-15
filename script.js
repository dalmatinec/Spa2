// ========== ПЕРЕВОД ==========
let currentLang = localStorage.getItem('language') || 'ru';
let translations = {};

async function loadTranslations() {
  try {
    const response = await fetch('lang.json');
    translations = await response.json();
    applyTranslations(currentLang);
  } catch (error) {
    console.error('Ошибка загрузки переводов:', error);
  }
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang-code') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  localStorage.setItem('language', lang);
  currentLang = lang;
}

function setLanguage(lang) {
  if (translations[lang]) {
    applyTranslations(lang);
  }
}

// ========== БУРГЕР-МЕНЮ ==========
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

let overlay = document.querySelector('.menu-overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);
}

function openMenu() {
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.menu-list a').forEach(link => {
  link.addEventListener('click', (e) => {
    closeMenu();
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ========== HEADER ПРИ СКРОЛЛЕ ==========
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ ==========
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const langCode = btn.getAttribute('data-lang-code');
    if (langCode) setLanguage(langCode);
  });
});

// ========== АККОРДЕОН FAQ ==========
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    accordionItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    item.classList.toggle('active');
  });
});

// ========== INTERSECTION OBSERVER (АНИМАЦИИ) ==========
const animatedElements = document.querySelectorAll('.card, .stat-card, .adv-card, .vip-card, .contacts-card, .hero-title, .hero-subtitle, .hero-description');

animatedElements.forEach(el => {
  el.classList.add('fade-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// ========== КНОПКИ (СКРОЛЛ К СЕКЦИЯМ) ==========
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const text = btn.textContent.toLowerCase();
    if (text.includes('программ') || text.includes('program') || text.includes('бағдарлама')) {
      e.preventDefault();
      const programsSection = document.getElementById('programs');
      if (programsSection) programsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (text.includes('связаться') || text.includes('contact') || text.includes('байланыс')) {
      e.preventDefault();
      const contactsSection = document.getElementById('contacts');
      if (contactsSection) contactsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (text.includes('приглашение') || text.includes('invitation') || text.includes('шақыру')) {
      e.preventDefault();
      const contactsSection = document.getElementById('contacts');
      if (contactsSection) contactsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (text.includes('сейчас') || text.includes('now')) {
      e.preventDefault();
      window.open('https://wa.me/77770001122', '_blank');
    }
  });
});

// ========== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ВСЕХ ССЫЛОК ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== ЗАГРУЗКА ПЕРЕВОДОВ ==========
loadTranslations();

// ========== ПРОБРОС КНОПОК TEL/WA ==========
document.querySelectorAll('.footer-social a, .contacts-row + .btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const href = btn.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      window.open('https://wa.me/77770001122', '_blank');
    }
  });
});