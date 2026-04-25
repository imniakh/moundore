/* ═══════════════════════════════════════
   MOUNDORE — www.moundore.com
   Production JS v1.0
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Scroll Reveal ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ─── Stat Counters ─── */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const step = duration / target;
        let current = 0;
        const timer = setInterval(() => {
          current++;
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.2 });
  counters.forEach(el => counterObserver.observe(el));

  /* ─── Navbar Scroll ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const isHome = nav.classList.contains('nav--transparent');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
        if (!isHome) nav.classList.add('nav--solid');
      }
    });
    if (!isHome) nav.classList.add('nav--solid');
  }

  /* ─── Mobile Menu ─── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
      hamburger.textContent = isOpen ? '☰' : '✕';
    });
  }

  /* ─── Contact Form (Formspree) ─── */
  const form = document.querySelector('#contact-form');
  const formSuccess = document.querySelector('.form__success');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.style.display = 'none';
          if (formSuccess) formSuccess.classList.add('form__success--visible');
        }
      } catch (err) {
        // Fallback: open mailto
        window.open('mailto:idrissa.niakh@moundore.com?subject=Contact via moundore.com');
      }
    });
  }

});
