// ============================================================
//  pages.js — Menu hamburger + formulaires WhatsApp
//  Utilisé par : nouveau.html, pasteur.html,
//                donner-ma-vie.html, bapteme.html
// ============================================================

// ---- Numéro WhatsApp de l'église (avec indicatif, sans +) ----
const WHATSAPP_NUMBER = '243810000000'; // Remplacez par le vrai numéro

// ---- Menu hamburger -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ---- Formulaire Pasteur -----------------------------------
  const pasteurForm = document.getElementById('pasteur-form');
  if (pasteurForm) {
    pasteurForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nom     = document.getElementById('p-nom').value.trim();
      const tel     = document.getElementById('p-tel').value.trim();
      const sujet   = document.getElementById('p-sujet').value.trim();
      const message = document.getElementById('p-message').value.trim();

      if (!nom || !tel || !message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      const texte = encodeURIComponent(
        `*Message pour le Pasteur — CEP Berée*\n` +
        `──────────────────\n` +
        `Nom     : ${nom}\n` +
        `Tél     : ${tel}\n` +
        (sujet ? `Sujet   : ${sujet}\n` : '') +
        `──────────────────\n` +
        `${message}\n` +
        `──────────────────\n` +
        `_Envoyé depuis cepberee.org_`
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texte}`, '_blank');
    });
  }

  // ---- Formulaire Baptême ----------------------------------
  const baptemeForm = document.getElementById('bapteme-form');
  if (baptemeForm) {
    baptemeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nom     = document.getElementById('b-nom').value.trim();
      const age     = document.getElementById('b-age').value.trim();
      const tel     = document.getElementById('b-tel').value.trim();
      const email   = document.getElementById('b-email').value.trim();
      const salut   = document.getElementById('b-salut').value;
      const message = document.getElementById('b-message').value.trim();

      if (!nom || !age || !tel || !salut) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      const salutLabel = {
        'oui': 'Oui, j\'ai accepté Jésus',
        'non': 'Non, pas encore',
        'incertain': 'Je ne suis pas sûr'
      }[salut] || salut;

      const texte = encodeURIComponent(
        `*Inscription au Baptême — CEP Berée*\n` +
        `──────────────────\n` +
        `Nom     : ${nom}\n` +
        `Âge     : ${age} ans\n` +
        `Tél     : ${tel}\n` +
        (email ? `Email   : ${email}\n` : '') +
        `Salut   : ${salutLabel}\n` +
        (message ? `──────────────────\n${message}\n` : '') +
        `──────────────────\n` +
        `_Envoyé depuis cepberee.org_`
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texte}`, '_blank');
    });
  }

});
