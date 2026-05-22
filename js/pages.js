// ============================================================
//  pages.js — WhatsApp pour toutes les pages
// ============================================================

const WHATSAPP_NUMBER = '243810990473';

document.addEventListener('DOMContentLoaded', () => {

  // ---- Formulaire Pasteur (pasteur.html) -----------------
  const pasteurForm = document.getElementById('pasteur-form');
  if (pasteurForm) {
    pasteurForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nom     = document.getElementById('p-nom')?.value.trim()     || '';
      const tel     = document.getElementById('p-tel')?.value.trim()     || '';
      const email   = document.getElementById('p-email')?.value.trim()   || '';
      const sujet   = document.getElementById('p-sujet')?.value.trim()   || '';
      const message = document.getElementById('p-message')?.value.trim() || '';

      if (!nom || !tel || !message) {
        alert('Veuillez remplir les champs obligatoires : nom, téléphone et message.');
        return;
      }

      const texte = encodeURIComponent(
        `Message pour le Pasteur venant du site Web CEP Berée\n\n` +
        `Je m'appelle *${nom}*,\n` +
        (sujet ? `Sujet : *${sujet}*\n` : '') +
        `${message}\n\n` +
        `Pour le suivi, mon num est le *${tel}*\n` +
        (email ? `Email : ${email}\n` : '')
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texte}`, '_blank');
    });
  }

  // ---- Formulaire Baptême (bapteme.html) -----------------
  const baptemeForm = document.getElementById('bapteme-form');
  if (baptemeForm) {
    baptemeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nom     = document.getElementById('b-nom')?.value.trim()     || '';
      const age     = document.getElementById('b-age')?.value.trim()     || '';
      const tel     = document.getElementById('b-tel')?.value.trim()     || '';
      const email   = document.getElementById('b-email')?.value.trim()   || '';
      const salut   = document.getElementById('b-salut')?.value          || '';
      const message = document.getElementById('b-message')?.value.trim() || '';

      if (!nom || !age || !tel || !salut) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      const salutLabel = {
        'oui':       "Oui, j'ai accepté Jésus",
        'non':       'Non, pas encore',
        'incertain': 'Je ne suis pas sûr'
      }[salut] || salut;

      const texte = encodeURIComponent(
        `Inscription au Baptême — venant du site Web CEP Berée\n\n` +
        `Je m'appelle *${nom}*, j'ai *${age} ans*.\n` +
        `Ai-je donné ma vie à Christ ? *${salutLabel}*\n` +
        (message ? `${message}\n\n` : '') +
        `Pour le suivi, mon num est le *${tel}*\n` +
        (email ? `Email : ${email}\n` : '')
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texte}`, '_blank');
    });
  }

});