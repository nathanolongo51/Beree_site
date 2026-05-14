// ============================================================
//  requetes.js — Validation et interactions du formulaire
//  de requête de prière
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const form       = document.getElementById('req-form');
  const successBox = document.getElementById('req-success');
  const textarea   = document.getElementById('req-message');
  const charCount  = document.getElementById('req-char');
  const MAX_CHARS  = 1000;

  // ---- Compteur de caractères ----------------------------
  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = len;
      charCount.style.color = len >= MAX_CHARS * 0.9
        ? '#e53935'
        : 'var(--text-muted)';
      if (len > MAX_CHARS) {
        textarea.value = textarea.value.slice(0, MAX_CHARS);
        charCount.textContent = MAX_CHARS;
      }
    });
  }

  // ---- Validation en temps réel --------------------------
  function validateField(input, errorId, condition) {
    const errEl = document.getElementById(errorId);
    if (!errEl) return condition;
    if (!condition) {
      input.classList.add('is-invalid');
      errEl.classList.add('visible');
    } else {
      input.classList.remove('is-invalid');
      errEl.classList.remove('visible');
    }
    return condition;
  }

  const nomInput     = document.getElementById('req-nom');
  const paysSelect   = document.getElementById('req-pays');
  const msgTextarea  = document.getElementById('req-message');

  if (nomInput) {
    nomInput.addEventListener('blur', () => {
      validateField(nomInput, 'err-nom', nomInput.value.trim().length > 1);
    });
  }

  if (paysSelect) {
    paysSelect.addEventListener('change', () => {
      validateField(paysSelect, 'err-pays', paysSelect.value !== '');
    });
  }

  if (msgTextarea) {
    msgTextarea.addEventListener('blur', () => {
      validateField(msgTextarea, 'err-message', msgTextarea.value.trim().length > 5);
    });
  }

  // ---- Numéro WhatsApp de l'église -----------------------
const WHATSAPP_NUMBER = '243821462002'; // Remplacez par le vrai numéro

// ---- Soumission du formulaire --------------------------
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomOk  = validateField(nomInput,    'err-nom',     nomInput.value.trim().length > 1);
    const paysOk = validateField(paysSelect,  'err-pays',    paysSelect.value !== '');
    const msgOk  = validateField(msgTextarea, 'err-message', msgTextarea.value.trim().length > 5);

    if (!nomOk || !paysOk || !msgOk) return;

    const nom     = nomInput.value.trim();
    const pays    = paysSelect.value;
    const message = msgTextarea.value.trim();
    const email   = document.getElementById('req-email')?.value.trim() || '';
    const tel     = document.getElementById('req-tel')?.value.trim()   || '';
    const anon    = document.getElementById('req-anon')?.checked;

    const nomAffiche = anon ? 'Anonyme' : nom;

    const texte = encodeURIComponent(
      `🙏 *Requête de Prière — CEP Berée*\n` +
      `──────────────────────\n` +
      `Nom     : ${nomAffiche}\n` +
      `Pays    : ${pays}\n` +
      (email ? `Email   : ${email}\n` : '') +
      (tel   ? `Tél     : ${tel}\n`   : '') +
      `──────────────────────\n` +
      `${message}\n` +
      `──────────────────────\n` +
      `_Envoyé depuis cepberee.org_`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texte}`, '_blank');
  });
}
});
