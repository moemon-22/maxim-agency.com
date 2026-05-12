(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.setAttribute('data-open', String(!expanded));
      document.body.style.overflow = !expanded ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('data-open', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const nav = document.querySelector('.nav');
  const heroPhoto = document.querySelector('[data-hero-photo]');

  if (nav && heroPhoto && 'IntersectionObserver' in window) {
    const navHeight = nav.offsetHeight || 72;
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('on-hero', entry.isIntersecting);
      },
      { rootMargin: `-${navHeight}px 0px 0px 0px`, threshold: 0 }
    );
    navObserver.observe(heroPhoto);
  }

  const fadeTargets = document.querySelectorAll('.fade-in');
  if (fadeTargets.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeTargets.forEach((el) => observer.observe(el));
  } else {
    fadeTargets.forEach((el) => el.classList.add('is-visible'));
  }
})();
