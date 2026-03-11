/* ================================================
   KG Travel & Entertainment — Global JS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky Nav ──────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ── Mobile Menu ─────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Active Nav Link ──────────────────────────
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll Fade-in ──────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Contact Form ─────────────────────────────
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.querySelector('[name="name"]').value.trim();
      const email   = form.querySelector('[name="email"]').value.trim();
      const phone   = form.querySelector('[name="phone"]').value.trim();
      const exp     = form.querySelector('[name="experience"]').value;
      const message = form.querySelector('[name="message"]').value.trim();

      const text = `Hello KG Travel! 👋\n\n*New Booking Request*\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nExperience: ${exp}\n\nMessage:\n${message}`;
      const url  = `https://wa.me/27768485141?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  // ── WhatsApp package buttons ──────────────────
  document.querySelectorAll('[data-package]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg  = btn.getAttribute('data-package');
      const text = `Hello KG Travel! I'm interested in the *${pkg}*. Please send me more details.`;
      window.open(`https://wa.me/27768485141?text=${encodeURIComponent(text)}`, '_blank');
    });
  });

});
