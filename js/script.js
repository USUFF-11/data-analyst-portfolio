// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  '.about-card, .timeline-item, .card, .cert-card, .service-card, .contact-info, .contact-form'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// Add reveal class and observe
revealElements.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Certificate lightbox trigger (single image, reuses lightbox)
document.querySelectorAll('.cert-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    galleryImages = [btn.getAttribute('data-src')];
    currentIndex = 0;
    openLightbox();
  });
});

// Project gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
let galleryImages = [];
let currentIndex = 0;

document.querySelectorAll('.gallery-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const card = trigger.closest('.card');
    galleryImages = card
      .getAttribute('data-gallery')
      .split(',')
      .map((s) => s.trim());
    currentIndex = 0;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = galleryImages[currentIndex];
  updateCounter();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateCounter() {
  lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
}

function showImage(dir) {
  currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
  updateCounter();
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => showImage(-1));
document.getElementById('lightboxNext').addEventListener('click', () => showImage(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showImage(-1);
  if (e.key === 'ArrowRight') showImage(1);
});

// Contact form — sends submissions to Formspree
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = contactForm.querySelector('button');
  button.textContent = 'Sending...';
  button.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      button.textContent = 'Message Sent!';
      contactForm.reset();
    } else {
      button.textContent = 'Try Again';
    }
  } catch (err) {
    button.textContent = 'Try Again';
  }

  setTimeout(() => {
    button.textContent = 'Submit Now';
    button.disabled = false;
  }, 3000);
});