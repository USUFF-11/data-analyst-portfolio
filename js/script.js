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