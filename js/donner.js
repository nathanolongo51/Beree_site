// ============================================================
//  donner.js — Accordéon FAQ page Donner ma vie à Jésus
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const items = document.querySelectorAll('.dv-faq__item');

  items.forEach(item => {
    const question = item.querySelector('.dv-faq__question');
    const arrow    = item.querySelector('.dv-faq__arrow svg');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('dv-faq__item--open');

      // Fermer tous les items ouverts
      items.forEach(i => {
        i.classList.remove('dv-faq__item--open');
        const a = i.querySelector('.dv-faq__arrow svg');
        if (a) a.innerHTML = `<polyline points="6 9 12 15 18 9"/>`;
      });

      // Si l'item cliqué était fermé, l'ouvrir
      if (!isOpen) {
        item.classList.add('dv-faq__item--open');
        if (arrow) arrow.innerHTML = `<polyline points="18 15 12 9 6 15"/>`;
      }
    });
  });

});