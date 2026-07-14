// ============================================================
// CONFIGURATION
// ============================================================
const CONFIG = {
  youtube: {
    apiKey:     'AIzaSyCLYMNOwpsCYWS5lqr5xo0hTOXunDg4BGQ',
    channelId:  'UCjRQ94R5zltTH8MsHuFCcsg',
    maxResults: 4
  },
  facebook: {
    pageId:      '616472574875076',
    accessToken: 'EAAdvIWKIA38BRhcohw254ZCkwnr78pz1bujh4h5JWFtcAj6NQKJyvnAZAJNgIZBNm1NaaxrfIzY7ifsdH0tSNIhDf1zLUZB0Rf1XFtI80RokA8EY9k5oPZA0j75fnd6ot4inw2PZBinkVcRdZAsDROdXGiC84In0DjSCoLGS4gHzHZCQ8UapP4W8c3dVulsD0YamZAJrKiTzUWeUyOg5ETZCDF',
    maxResults:  4
  }
};

let activeTab = 'youtube';

// ---- Onglets ------------------------------------------------
document.querySelectorAll('.une-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.une-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    activeTab = btn.dataset.tab;
    loadContent(activeTab);
  });
});

// ---- Helpers ------------------------------------------------
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Votre fonction globale existante
function truncate(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n).trimEnd() + '…' : str;
}

function showSkeleton() {
  const s = document.getElementById('une-skeleton');
  const g = document.getElementById('une-grid');
  const e = document.getElementById('une-error');
  if (s) s.style.display = 'grid';
  if (g) g.style.display = 'none';
  if (e) e.style.display = 'none';
}

function showGrid() {
  const s = document.getElementById('une-skeleton');
  const g = document.getElementById('une-grid');
  const e = document.getElementById('une-error');
  if (s) s.style.display = 'none';
  if (g) g.style.display = 'grid';
  if (e) e.style.display = 'none';
}

function showError() {
  const s = document.getElementById('une-skeleton');
  const g = document.getElementById('une-grid');
  const e = document.getElementById('une-error');
  if (s) s.style.display = 'none';
  if (g) g.style.display = 'none';
  if (e) e.style.display = 'flex';
}

// ---- Rendu des cards ----------------------------------------
function renderCards(items, platform) {
  const grid = document.getElementById('une-grid');
  if (!items || items.length === 0) { showError(); return; }

  const [featured, ...rest] = items;

  const platformIcon = platform === 'youtube'
    ? `<svg class="card-platform-icon yt" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.6 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.3.6 9.3.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
       </svg>`
    : `<svg class="card-platform-icon fb" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
       </svg>`;

  const badgeClass = platform === 'youtube' ? 'une-badge--yt' : 'une-badge--fb';
  const badgeLabel = platform === 'youtube' ? 'YouTube' : 'Facebook';
  const playBtn    = platform === 'youtube'
    ? `<div class="play-btn"><svg viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></div>`
    : '';
  const playBtnSm  = platform === 'youtube'
    ? `<div class="play-btn play-btn--sm"><svg viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></div>`
    : '';

  const featuredHTML = `
<a href="${featured.url}" target="_blank" rel="noopener" class="une-card une-card--featured">
  <div class="une-card__img-wrap">
    <img src="${featured.thumbnail}" alt="${featured.title}" loading="lazy">
    <span class="une-badge ${badgeClass}">${badgeLabel}</span>
    ${playBtn}
  </div>

  <div class="une-card__body">
    <div class="une-card__meta">
      ${platformIcon}
      <span class="une-card__date">${formatDate(featured.date)}</span>
    </div>

    <h3 class="une-card__title">${truncate(featured.title, 90)}</h3>
    <p class="une-card__excerpt">${truncate(featured.description, 180)}</p>

    <span class="une-card__link">
      Voir sur ${badgeLabel} <span>→</span>
    </span>
  </div>
</a>`;

const sideHTML = rest.slice(0, 3).map(item => `
<a href="${item.url}" target="_blank" rel="noopener" class="une-card une-card--small">
  <div class="une-card__img-wrap">
    <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
    ${playBtnSm}
  </div>

  <div class="une-card__body">
    <div class="une-card__meta">
      ${platformIcon}
      <span class="une-card__date">${formatDate(item.date)}</span>
    </div>

    <h3 class="une-card__title">${truncate(item.title, 65)}</h3>

    <span class="une-card__link">
      Voir →
    </span>
  </div>
</a>
`).join('');

  grid.innerHTML = `${featuredHTML}<div class="une-side">${sideHTML}</div>`;
  showGrid();
}

// ---- Youtube -----------------------------------------------
async function loadYoutube() {
  const { apiKey, channelId, maxResults } = CONFIG.youtube;

  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=contentDetails`;
  const channelRes = await fetch(channelUrl);
  if (!channelRes.ok) throw new Error('YouTube channel error: ' + channelRes.status);
  const channelData = await channelRes.json();
  const uploadPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

  const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${uploadPlaylistId}&part=snippet&maxResults=${maxResults}`;
  const playlistRes = await fetch(playlistUrl);
  if (!playlistRes.ok) throw new Error('YouTube playlist error: ' + playlistRes.status);
  const data = await playlistRes.json();

  return (data.items || []).map(item => ({
    title:       item.snippet.title,
    description: item.snippet.description,
    thumbnail:   item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    date:        item.snippet.publishedAt,
    url:         `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
  }));
}

// ---- Facebook -----------------------------------------------
async function loadFacebook() {
  const { pageId, accessToken, maxResults } = CONFIG.facebook;
  const fields = 'id,message,story,full_picture,created_time,permalink_url';
  const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=${fields}&limit=${maxResults}&access_token=${accessToken}`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error('Facebook API error: ' + res.status);
  const data = await res.json();
  return (data.data || []).map(item => ({
    title:       item.story || truncate(item.message, 80) || 'Publication Facebook',
    description: item.message || '',
    thumbnail:   item.full_picture || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80',
    date:        item.created_time,
    url:         item.permalink_url
  }));
}

// ---- Chargement principal Grille (YT/FB) -------------------
async function loadContent(platform) {
  showSkeleton();
  try {
    const items = platform === 'youtube' ? await loadYoutube() : await loadFacebook();
    renderCards(items, platform);
  } catch (err) {
    console.error(err);
    showError();
  }
}


/* ============================================================
   POPUP ÉVÉNEMENT — CEP Berée
   - Affiche TOUS les événements à venir (plus un seul)
   - S'affiche INSTANTANÉMENT au chargement de la page
   - Auto-scroll automatique toutes les 4 secondes si plusieurs événements
   - Ignore 100% des événements dont la date est dépassée
   - Gère les dates sur un jour et sur plusieurs jours
   - Se base sur la date ÉCRITE DANS LE POST, pas sur created_time
   ============================================================ */

const MOIS_MAP = {
  'janvier': 1, 'février': 2, 'fevrier': 2, 'mars': 3, 'avril': 4, 'mai': 5,
  'juin': 6, 'juillet': 7, 'août': 8, 'aout': 8, 'septembre': 9,
  'octobre': 10, 'novembre': 11, 'décembre': 12, 'decembre': 12
};
const MOIS_PATTERN = Object.keys(MOIS_MAP).join('|');

/**
 * Déduit l'année de manière sécurisée si elle n'est pas écrite dans le post.
 */
function resolveYear(mois, jour, anneeStr) {
  if (anneeStr) return parseInt(anneeStr, 10);
  
  const now = new Date();
  let annee = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (currentMonth >= 11 && mois <= 2) {
    annee += 1;
  } else if (currentMonth <= 2 && mois >= 11) {
    annee -= 1;
  }

  return annee;
}

/**
 * Extrait toutes les plages de dates (début/fin) trouvées dans le texte d'un post.
 */
function extractDateRanges(message) {
  if (!message) return [];
  const ranges = [];
  const consumed = [];

  // 1. Plages explicites : "du 12 au 17 août"
  const rangeRegex = new RegExp(
    `du\\s+(\\d{1,2})(?:er)?(?:\\s+(${MOIS_PATTERN}))?\\s+au\\s+(\\d{1,2})(?:er)?\\s+(${MOIS_PATTERN})(?:\\s+(\\d{4}))?`,
    'gi'
  );

  let match;
  while ((match = rangeRegex.exec(message)) !== null) {
    const jourDebut = parseInt(match[1], 10);
    const moisFinNom = match[4].toLowerCase();
    const moisDebutNom = (match[2] || match[4]).toLowerCase();
    const jourFin = parseInt(match[3], 10);
    const moisDebut = MOIS_MAP[moisDebutNom];
    const moisFin = MOIS_MAP[moisFinNom];

    if (jourDebut && moisDebut && jourFin && moisFin) {
      const annee = resolveYear(moisFin, jourFin, match[5]);
      let anneeDebut = annee;
      if (moisDebut > moisFin) anneeDebut = annee - 1;

      ranges.push({
        start: new Date(anneeDebut, moisDebut - 1, jourDebut),
        end: new Date(annee, moisFin - 1, jourFin, 23, 59, 59)
      });
    }
    consumed.push([match.index, match.index + match[0].length]);
  }

  // 2. Dates isolées
  const singleRegex = new RegExp(
    `(\\d{1,2})[\\/\\s\\-](\\d{1,2})[\\/\\s\\-](\\d{4})|(\\d{1,2})(?:er)?\\s+(${MOIS_PATTERN})(?:\\s+(\\d{4}))?`,
    'gi'
  );

  while ((match = singleRegex.exec(message)) !== null) {
    const dejaUtilise = consumed.some(([s, e]) => match.index >= s && match.index < e);
    if (dejaUtilise) continue;

    let jour, mois, annee;
    if (match[3]) {
      jour = parseInt(match[1], 10);
      mois = parseInt(match[2], 10);
      annee = parseInt(match[3], 10);
    } else if (match[5]) {
      jour = parseInt(match[4], 10);
      mois = MOIS_MAP[match[5].toLowerCase()];
      annee = resolveYear(mois, jour, match[6]);
    }

    if (jour && mois && annee) {
      ranges.push({
        start: new Date(annee, mois - 1, jour),
        end: new Date(annee, mois - 1, jour, 23, 59, 59)
      });
    }
  }

  return ranges;
}

function getEventStatus(message) {
  const ranges = extractDateRanges(message);
  const now = new Date();

  if (ranges.length === 0) {
    return { isUpcoming: false, earliestStart: null };
  }

  const upcoming = ranges.filter(r => r.end >= now);
  if (upcoming.length === 0) {
    return { isUpcoming: false, earliestStart: null };
  }

  const earliestStart = new Date(Math.min(...upcoming.map(r => r.start.getTime())));
  return { isUpcoming: true, earliestStart };
}

async function loadPopupEvenement() {
  const { pageId, accessToken } = CONFIG.facebook;

  const KEYWORDS = [
    'événement', 'evenement', 'mardi enseignement', 'jeudi enseignement', 'culte dominical',
    'conférence', 'rencontre des jeunes', 'retraite', 'concert', 'séminaire', 'seminaire',
    'service spécial', 'prière', 'priere', 'convention', 'semaine de grâce', 'semaine de grace', 'semaine',
    'réveil', 'reveil', 'jeûne', 'jeune', 'intercession', 'nuit de prière', 'nuit de priere',
    'évangélisation', 'evangelisation', 'rencontre des femmes', 'deliez-le', 'deliezle', 'sainte cène', 'saint cene'
  ];

  try {
    const fields = 'id,message,story,full_picture,created_time,permalink_url';
    const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=${fields}&limit=50&access_token=${accessToken}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur HTTP Facebook Popup: ${res.status}`);
    const data = await res.json();

    const now = new Date();

    const candidatePosts = (data.data || []).filter(item => {
      const text = ((item.message || '') + (item.story || '')).toLowerCase();
      const postDate = new Date(item.created_time);
      const joursEcoules = (now - postDate) / (1000 * 60 * 60 * 24);
      return item.full_picture && joursEcoules <= 60 && KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
    });

    const events = candidatePosts
      .map(post => ({ post, status: getEventStatus(post.message || '') }))
      .filter(({ status }) => status.isUpcoming)
      .sort((a, b) => {
        if (a.status.earliestStart && b.status.earliestStart) {
          return a.status.earliestStart - b.status.earliestStart;
        }
        if (a.status.earliestStart) return -1;
        if (b.status.earliestStart) return 1;
        return new Date(b.post.created_time) - new Date(a.post.created_time);
      })
      .map(({ post }) => post);

    if (events.length === 0) return;

    renderEventPopup(events);

  } catch (err) {
    console.error('Popup événement error:', err);
  }
}

function renderEventPopup(events) {
  const popup = document.createElement('div');
  popup.id = 'event-popup';

  const slidesHTML = events.map(post => `
    <div class="event-popup__slide">
      <a href="${post.permalink_url}" target="_blank" rel="noopener">
        <img src="${post.full_picture}" alt="Événement CEP Berée">
      </a>
      <div class="event-popup__body">
        <p class="event-popup__msg">${truncate(post.message, 150)}</p>
        <a href="${post.permalink_url}" target="_blank" rel="noopener" class="event-popup__btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
          </svg>
          Voir sur Facebook
        </a>
      </div>
    </div>
  `).join('');

  const dotsHTML = events.length > 1
    ? `<div class="event-popup__dots">${events.map((_, i) =>
        `<button class="event-popup__dot${i === 0 ? ' event-popup__dot--active' : ''}" data-index="${i}" aria-label="Événement ${i + 1}"></button>`
      ).join('')}</div>`
    : '';

  const arrowsHTML = events.length > 1
    ? `<button class="event-popup__arrow event-popup__arrow--prev" id="event-popup-prev" aria-label="Précédent">‹</button>
       <button class="event-popup__arrow event-popup__arrow--next" id="event-popup-next" aria-label="Suivant">›</button>`
    : '';

  popup.innerHTML = `
    <div class="event-popup__overlay" id="event-popup-overlay"></div>
    <div class="event-popup__box">
      <button class="event-popup__close" id="event-popup-close">✕</button>
      <div class="event-popup__slider" id="event-popup-slider">
        <div class="event-popup__track" id="event-popup-track">
          ${slidesHTML}
        </div>
        ${arrowsHTML}
      </div>
      ${dotsHTML}
    </div>
  `;

  document.body.appendChild(popup);
  
  // CHANGEMENT : S'affiche immédiatement au chargement de la page
  // (Le délai de 50ms permet seulement au navigateur d'enregistrer l'état initial pour l'animation CSS d'ouverture)
  setTimeout(() => popup.classList.add('event-popup--visible'), 50);

  let current = 0;
  const track = popup.querySelector('#event-popup-track');
  const dots = popup.querySelectorAll('.event-popup__dot');
  const total = events.length;
  let autoScrollTimer = null;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(d => d.classList.toggle('event-popup__dot--active', parseInt(d.dataset.index, 10) === current));
  }

  // Fonction pour démarrer/réinitialiser le défilement automatique
  function startAutoScroll() {
    if (total > 1) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = setInterval(() => {
        goTo(current + 1);
      }, 4000); // 4000 ms = défilement toutes les 4 secondes
    }
  }

  if (total > 1) {
    startAutoScroll();

    // Flèche Précédent
    popup.querySelector('#event-popup-prev').addEventListener('click', () => {
      goTo(current - 1);
      startAutoScroll(); // Réinitialise le compteur après interaction
    });

    // Flèche Suivant
    popup.querySelector('#event-popup-next').addEventListener('click', () => {
      goTo(current + 1);
      startAutoScroll();
    });

    // Clic sur les points indicateurs (dots)
    dots.forEach(dot => dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      startAutoScroll();
    }));

    // Swipe tactile sur mobile
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { 
      touchStartX = e.touches[0].clientX; 
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (diff > 50) {
        goTo(current - 1);
        startAutoScroll();
      } else if (diff < -50) {
        goTo(current + 1);
        startAutoScroll();
      }
    }, { passive: true });
  }

  function closePopup() {
    clearInterval(autoScrollTimer); // Nettoyage de l'intervalle lors de la fermeture
    popup.classList.remove('event-popup--visible');
    setTimeout(() => popup.remove(), 400);
  }

  popup.querySelector('#event-popup-close').addEventListener('click', closePopup);
  popup.querySelector('#event-popup-overlay').addEventListener('click', closePopup);
}

// ---- DOMContentLoaded (Gestionnaire global des écouteurs) ----
document.addEventListener('DOMContentLoaded', () => {

  // ---- Formulaire contact WhatsApp ----------------------------
  const WHATSAPP_NUMBER = '243815147352';
  const contactSubmit = document.getElementById('c-submit');
  
  if (contactSubmit) {
    contactSubmit.addEventListener('click', () => {
      const prenom  = document.getElementById('c-prenom').value.trim();
      const nom     = document.getElementById('c-nom').value.trim();
      const email   = document.getElementById('c-email').value.trim();
      const tel     = document.getElementById('c-tel').value.trim();
      const message = document.getElementById('c-message').value.trim();

      if (!prenom || !tel || !message) {
        alert('Veuillez remplir les champs obligatoires : prénom, téléphone et message.');
        return;
      }

      const texte = encodeURIComponent(
        `Contact Église CEP Berée - Message du site Web\n\n` +
        `Je m'appelle ${prenom} ${nom},\n` +
        `${message}\n` +
        `Pour le suivi, mon num est le ${tel}\n` +
        (email ? `\nEmail : ${email}\n` : '')
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texte}`, '_blank');
    });
  }

  // ---- Exécutions spécifiques à la page d'accueil (index.html) ----
  if (document.getElementById('une-skeleton')) {
    // 1. Charger le flux de cartes (YouTube par défaut)
    loadContent('youtube');
    // 2. Déclencher la popup événement Facebook
    loadPopupEvenement();
  }

  // ---- Bouton retour en haut ----------------------------------
  const btnTop = document.getElementById('btn-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.classList.toggle('visible', window.scrollY > 100);
    });

    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Menu hamburger -----------------------------------------
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');
  const closeBtn   = document.getElementById('nav-mobile-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      if (closeBtn) closeBtn.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        if (closeBtn) closeBtn.classList.remove('open');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        closeBtn.classList.remove('open');
      });
    }
  }

  // ---- Dropdown À Propos menu mobile ----------------------
  const dropdownBtn  = document.getElementById('dropdown-about-btn');
  const dropdownList = document.getElementById('dropdown-about');

  if (dropdownBtn && dropdownList) {
    dropdownBtn.addEventListener('click', () => {
      dropdownBtn.classList.toggle('open');
      dropdownList.classList.toggle('open');
    });
  }

  // ---- Dropdown À Propos nav desktop ----------------------
  const navDropdownBtn  = document.getElementById('nav-dropdown-btn');
  const navDropdownList = document.getElementById('nav-dropdown-list');

  if (navDropdownBtn && navDropdownList) {
    navDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navDropdownList.classList.toggle('open');
      if (navDropdownBtn.querySelector('svg')) {
        navDropdownBtn.querySelector('svg').style.transform =
          navDropdownList.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });

    navDropdownList.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.addEventListener('click', () => {
      navDropdownList.classList.remove('open');
      if (navDropdownBtn.querySelector('svg')) {
        navDropdownBtn.querySelector('svg').style.transform = 'rotate(0deg)';
      }
    });
  }
});