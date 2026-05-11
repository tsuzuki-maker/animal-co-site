(function () {
  // ── CSS ─────────────────────────────────────────────────────────
  var css = [
    '.ra-nav{position:sticky;top:0;z-index:100;background:rgba(255,249,238,0.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(47,55,78,0.06);}',
    '.ra-nav-inner{max-width:1240px;margin:0 auto;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;}',
    '.ra-logo{display:flex;align-items:center;gap:10px;font-family:var(--font-display);font-weight:700;font-size:16px;letter-spacing:0.1em;color:var(--ra-ink);text-decoration:none;cursor:pointer;background:none;border:none;}',
    '.ra-logo-mark{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#FF6F61,#F98A23);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px;}',
    '.ra-nav-links{display:flex;align-items:center;gap:28px;}',
    '.ra-nav-links a{font-size:13px;font-weight:500;color:var(--ra-ink);letter-spacing:0.1em;text-decoration:none;}',
    '.ra-nav-links a:hover,.ra-nav-links a.active{color:var(--ra-primary);}',
    '.ra-nav-cta{padding:10px 22px;border-radius:100px;background:linear-gradient(135deg,#FF6F61,#F98A23);color:#fff;font-size:13px;font-weight:700;letter-spacing:0.1em;cursor:pointer;border:none;}',
    '.ra-coming-soon-link{position:relative;}',
    '.ra-coming-soon-link::after{content:"COMING SOON";position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);background:#2F374E;color:#fff;font-family:var(--font-display);font-size:10px;font-weight:700;letter-spacing:0.15em;padding:5px 10px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity 0.2s ease;}',
    '.ra-coming-soon-link::before{content:"";position:absolute;top:calc(100% + 4px);left:50%;transform:translateX(-50%);border:5px solid transparent;border-bottom-color:#2F374E;opacity:0;pointer-events:none;transition:opacity 0.2s ease;}',
    '.ra-coming-soon-link:hover::after,.ra-coming-soon-link:hover::before{opacity:1;}',
    '.ra-hamburger{display:none;cursor:pointer;border:none;background:none;font-size:22px;color:var(--ra-ink);width:40px;height:40px;align-items:center;justify-content:center;z-index:300;}',
    '#ra-mobile-overlay{display:none;}',
    '@media(max-width:768px){',
    '.ra-nav-inner{padding:10px 16px;}',
    '.ra-logo{font-size:13px;}',
    '.ra-logo-mark{width:30px;height:30px;font-size:15px;border-radius:8px;}',
    '.ra-nav-links--desktop{display:none;}',
    '#ra-mobile-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgb(255,249,238);flex-direction:column;align-items:center;justify-content:center;gap:40px;z-index:500;}',
    '#ra-mobile-overlay.open{display:flex;}',
    '#ra-mobile-overlay a{font-size:22px;letter-spacing:0.12em;color:var(--ra-ink);font-weight:600;text-decoration:none;}',
    '#ra-mobile-overlay .ra-nav-cta{font-size:15px;padding:14px 36px;margin-top:8px;}',
    '.ra-menu-close{position:absolute;top:20px;right:20px;background:none;border:none;font-size:28px;color:var(--ra-ink);cursor:pointer;padding:8px;}',
    '.ra-hamburger{display:flex;z-index:600;}',
    '}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── ページ判定 ───────────────────────────────────────────────────
  var p = window.location.pathname;
  var isAbout = p.indexOf('about.html') !== -1 || p.indexOf('/about') !== -1;
  var base = isAbout ? 'index.html' : '';

  function href(anchor) { return base ? base + anchor : anchor; }

  // ── メニュー開閉 ─────────────────────────────────────────────────
  window._navClose = function () {
    var o = document.getElementById('ra-mobile-overlay');
    var b = document.querySelector('.ra-hamburger');
    if (!o || !b) return;
    o.classList.remove('open');
    b.classList.remove('open');
    b.innerHTML = '&#x2630;';
  };
  window._navToggle = function () {
    var o = document.getElementById('ra-mobile-overlay');
    var b = document.querySelector('.ra-hamburger');
    if (!o || !b) return;
    o.classList.toggle('open');
    b.classList.toggle('open');
    b.innerHTML = o.classList.contains('open') ? '&#x2715;' : '&#x2630;';
  };
  window.closeMenu = window._navClose; // about.html の既存 JS との互換

  // ── HTML 生成 ────────────────────────────────────────────────────
  var logoClick = isAbout
    ? "onclick=\"location.href='index.html'\""
    : "onclick=\"window.scrollTo({top:0,behavior:'smooth'})\"";

  var aboutActive = isAbout ? ' class="active"' : '';

  var contactAction = isAbout
    ? "window._navClose(); location.href='index.html#contact-form';"
    : "document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'});";

  var html =
    '<nav class="ra-nav">' +
      '<div class="ra-nav-inner">' +
        '<div class="ra-logo" ' + logoClick + '>' +
          '<div class="ra-logo-mark">R</div>' +
          'Rebucul Animal Co.' +
        '</div>' +
        '<div class="ra-nav-links ra-nav-links--desktop">' +
          '<a href="' + href('#team') + '">チーム</a>' +
          '<a href="about.html"' + aboutActive + '>会社紹介</a>' +
          '<a href="' + href('#works') + '" class="ra-coming-soon-link">実績</a>' +
          '<a href="' + href('#service') + '" class="ra-coming-soon-link">サービス</a>' +
          '<button class="ra-nav-cta" onclick="' + contactAction + '">お問い合わせ →</button>' +
        '</div>' +
        '<button class="ra-hamburger" onclick="window._navToggle()" aria-label="メニュー">&#x2630;</button>' +
      '</div>' +
    '</nav>' +
    '<div id="ra-mobile-overlay">' +
      '<button class="ra-menu-close" onclick="window._navClose()">&#x2715;</button>' +
      '<a href="' + (isAbout ? 'index.html' : '#') + '" onclick="window._navClose()">トップ</a>' +
      '<a href="' + href('#team') + '" onclick="window._navClose()">チーム</a>' +
      '<a href="about.html"' + aboutActive + ' onclick="window._navClose()">会社紹介</a>' +
      '<a href="' + href('#works') + '" class="ra-coming-soon-link" onclick="window._navClose()">実績</a>' +
      '<a href="' + href('#service') + '" class="ra-coming-soon-link" onclick="window._navClose()">サービス</a>' +
      '<button class="ra-nav-cta" onclick="' + contactAction + '">お問い合わせ →</button>' +
    '</div>';

  // ── 挿入 ─────────────────────────────────────────────────────────
  var s = document.currentScript;
  if (s) {
    s.insertAdjacentHTML('afterend', html);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.insertAdjacentHTML('afterbegin', html);
    });
  }
})();
