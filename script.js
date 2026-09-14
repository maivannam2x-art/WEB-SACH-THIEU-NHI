const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealItems.forEach((item) => observer.observe(item));

// Give the hero a polished parallax response without affecting touch devices.
const heroArt = document.querySelector('.hero-art');
const heroCard = document.querySelector('.hero-card');

if (heroArt && heroCard && window.matchMedia('(pointer:fine)').matches) {
  heroArt.addEventListener('pointermove', (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `rotate(${2.5 + x * 2}deg) translate(${x * 7}px, ${y * 7}px)`;
  });

  heroArt.addEventListener('pointerleave', () => {
    heroCard.style.transform = 'rotate(2.5deg)';
  });
}
