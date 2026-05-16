// ============================================================
//  CONFIGURATION
// ============================================================
const CONFIG = {
  youtube: {
    apiKey:     'AIzaSyCLYMNOwpsCYWS5lqr5xo0hTOXunDg4BGQ',
    channelId:  'UCjRQ94R5zltTH8MsHuFCcsg',
    maxResults: 4
  },
  facebook: {
    pageId:      '616472574875076',
    accessToken: 'EAAdvIWKIA38BRcw64MvOZCN99ZCXKS2daFNeLc61ZAMqurDyZBbHXf0vSZCDsPdLVMegDtViiMyZCZC3BQkWgbYTJmAv9tCgNarRZCwHiBAdVTZCUAZAhu0mX72doPxeBbwsvL34KmtlySxT4mX5DgIxzcmLqg9Erh0jNPDmG5XTCnfC4jG5PdHY1FbrrceyvRMKrnk2Dxa72KHrNZCay3AW3zFNwmZB',
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
    <div class="une-card une-card--featured">
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
        <a href="${featured.url}" target="_blank" rel="noopener" class="une-card__link">
          Voir sur ${badgeLabel} <span>→</span>
        </a>
      </div>
    </div>`;

  const sideHTML = rest.slice(0, 3).map(item => `
    <div class="une-card une-card--small">
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
        <a href="${item.url}" target="_blank" rel="noopener" class="une-card__link">
          Voir <span>→</span>
        </a>
      </div>
    </div>`).join('');

  grid.innerHTML = `${featuredHTML}<div class="une-side">${sideHTML}</div>`;
  showGrid();
}

// ---- YouTube ------------------------------------------------
async function loadYoutube() {
  const { apiKey, channelId, maxResults } = CONFIG.youtube;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}&type=video`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error('YouTube API error: ' + res.status);
  const data = await res.json();
  return (data.items || []).map(item => ({
    title:       item.snippet.title,
    description: item.snippet.description,
    thumbnail:   item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    date:        item.snippet.publishedAt,
    url:         `https://www.youtube.com/watch?v=${item.id.videoId}`
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

// ---- Chargement principal -----------------------------------
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

// ---- Un seul DOMContentLoaded -------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // YouTube/Facebook — seulement sur index.html
  if (document.getElementById('une-skeleton')) {
    loadContent('youtube');
  }

  // Menu hamburger — toutes les pages
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

});