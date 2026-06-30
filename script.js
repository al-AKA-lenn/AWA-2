// ── Slides content ──
const slides = [
  "Ada sesuatu yang aku mau bilang sama kamu, dan hari ini aku beraniin diri buat ngomong sama kamu.",
  "Kamu tuh beda banget. Setiap kali kita call, aku selalu nyaman banget, gatau ia aku tu kaya kecintaan banget sama kamu",
  "Bahkan waktu kamu lagi yapping nggak apa pun, aku suka dengerin suara kamu. Nggak pernah bosen, malah pengen lebih lama HEEHHEH.",
  "Energi kamu yang selalu happy, cara kamu jadi diri sendiri,  semuanya bikin aku nggak bisa berhenti mikirin kamu tau, lucu ih kamu.",
  "Dan setiap kali aku denger cerita kamu soal masa lalu, di sakitin, di selingkuhin, di toxic in aku kesel banget. <em>Ish geramnyoo SIAPA SI ITU.</em>",
  "Kamu tuh orangnya bawa positive vibes ke semua orang, dan aku nggak mau liat kamu diperlakuin kayak gitu lagi. Kamu layak dapet yang lebih baik, aku mungkin? HEHEHEHE",
  "Aku nggak tahu kamu ngerasain hal yang sama atau nggak. Tapi aku nggak mau terus diem dan nyesel ak gmau."
];

// ── Modal messages (satu per klik bergantian) ──
const modalMessages = [
  "ini namanya awa, cewe paling lucuuuu yang pernah aku temuin.",
  "aku happy banget bisa ketemu sama awa, asliee ini mah.",
  "call-an sama awa nyaman banget, aku pengen lebih lama lamaa banget.",
  "AKU SUKA AWAAA HEHEHEEHE",
  "dia tu cewe yang bawa positif vibes sama aku, seneng banget deh. nakal dikit HEHEHEHEHEH suka.",
  "ak gasuka bgt ada yg nyakitin kamu. KOK BISA SII CEWE KAYA GINI DI SAKITIN ISH kesel bgt.",
  "banyak lagi yang ak suka dri kamu wlau baru kenal seminggu ia hehe.",
  "kaya ak jdi kecintaan bgt deh sama kamu."
];
let modalIdx = 0;

let currentSlide = 0;

// ── ambient stars ──
function initStars() {
  const starEl = document.getElementById('stars');
  const chars  = ['✦','✧','⋆','·','★','✨'];
  const colors = ['#FF6B9D','#FFD93D','#6FDFB8','#C3B1E1','#FFB347'];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    s.textContent = chars[Math.floor(Math.random() * chars.length)];
    s.style.left              = Math.random() * 100 + 'vw';
    s.style.fontSize          = (12 + Math.random() * 16) + 'px';
    s.style.color             = colors[Math.floor(Math.random() * colors.length)];
    s.style.animationDuration = (6 + Math.random() * 10) + 's';
    s.style.animationDelay    = (Math.random() * 8) + 's';
    starEl.appendChild(s);
  }
}

// ── screen switching ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── intro → slide ──
function startSlides() {
  currentSlide = 0;
  showScreen('slideScreen');
  renderSlide();
}

// ── render current slide ──
function renderSlide() {
  const textEl    = document.getElementById('slideText');
  const counterEl = document.getElementById('slideCounter');
  const btnNext   = document.getElementById('btnNext');
  const dotsEl    = document.getElementById('dots');

  textEl.style.animation = 'none';
  textEl.offsetHeight;
  textEl.style.animation = 'textFadeIn .6s ease both';
  textEl.innerHTML = slides[currentSlide];

  counterEl.textContent = (currentSlide + 1) + ' / ' + slides.length;

  dotsEl.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === currentSlide ? ' active' : '');
    dotsEl.appendChild(d);
  });

  btnNext.textContent = currentSlide === slides.length - 1 ? 'Lanjut...' : 'Lanjut';
}

// ── next slide ──
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    renderSlide();
  } else {
    showQuestion();
  }
}

// ── show question screen ──
function showQuestion() {
  showScreen('questionScreen');
  placeNoButton();
}

// ── place "Tidak" button at bottom-center initially ──
function placeNoButton() {
  const btn = document.getElementById('btnNo');
  btn.style.left = (window.innerWidth / 2 - (btn.offsetWidth || 140) / 2) + 'px';
  btn.style.top  = (window.innerHeight - 100) + 'px';
}

// ── run away (cannot be clicked ever) ──
function runAway(btn) {
  const vw   = window.innerWidth;
  const vh   = window.innerHeight;
  const bw   = btn.offsetWidth  || 140;
  const bh   = btn.offsetHeight || 52;
  const curL = parseFloat(btn.style.left) || vw / 2;
  const curT = parseFloat(btn.style.top)  || vh - 100;
  let nx, ny, tries = 0;
  do {
    nx = 10 + Math.random() * (vw - bw - 20);
    ny = 10 + Math.random() * (vh - bh - 20);
    tries++;
  } while (tries < 30 && Math.abs(nx - curL) < 100 && Math.abs(ny - curT) < 100);
  btn.style.left = nx + 'px';
  btn.style.top  = ny + 'px';
}

// ── YES handler ──
function handleYes() {
  showScreen('yesScreen');
  launchConfetti();
  launchHearts();
}

// ── PHOTO MODAL ──
function openModal() {
  const msg = document.getElementById('modalMsg');
  msg.style.animation = 'none';
  msg.offsetHeight;
  msg.style.animation = 'textFadeIn .4s ease both';
  msg.textContent = modalMessages[modalIdx % modalMessages.length];
  modalIdx++;
  document.getElementById('photoModal').classList.add('active');
}

function closeModal() {
  document.getElementById('photoModal').classList.remove('active');
}

// close when clicking backdrop
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  showScreen('introScreen');

  document.getElementById('photoModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // keep "Tidak" running away on all pointer events
  const btnNo = document.getElementById('btnNo');
  btnNo.addEventListener('mousemove',    () => runAway(btnNo));
  btnNo.addEventListener('pointerenter', () => runAway(btnNo));
  btnNo.addEventListener('touchstart',   (e) => { e.preventDefault(); runAway(btnNo); }, { passive: false });
  btnNo.addEventListener('click',        (e) => { e.preventDefault(); runAway(btnNo); });
});

// ── confetti burst ──
function launchConfetti() {
  const burst  = document.getElementById('burst');
  const colors = ['#FF6B9D','#FFD93D','#6FDFB8','#C3B1E1','#FFB347','#FF9EBB'];
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  for (let i = 0; i < 90; i++) {
    const p     = document.createElement('div');
    p.className = 'piece';
    const angle = Math.random() * 360;
    const dist  = 120 + Math.random() * 280;
    const tx    = Math.cos(angle * Math.PI / 180) * dist + 'px';
    const ty    = Math.sin(angle * Math.PI / 180) * dist + 'px';
    p.style.cssText = [
      'left:'          + cx + 'px',
      'top:'           + cy + 'px',
      'background:'    + colors[Math.floor(Math.random() * colors.length)],
      'border-radius:' + (Math.random() > .5 ? '50%' : '2px'),
      '--tx:translate(' + tx + ',' + ty + ')',
      '--rot:'         + (Math.random() * 720 - 360) + 'deg',
      'animation-delay:' + (Math.random() * .3) + 's',
    ].join(';');
    burst.appendChild(p);
  }
  setTimeout(() => burst.innerHTML = '', 2200);
}

// ── floating hearts ──
function launchHearts() {
  const hearts = ['💖','💕','💗','💓','🩷'];
  for (let i = 0; i < 16; i++) {
    setTimeout(() => {
      const h       = document.createElement('div');
      h.className   = 'heart-float';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left     = (8 + Math.random() * 84) + 'vw';
      h.style.bottom   = '0';
      h.style.fontSize = (18 + Math.random() * 22) + 'px';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 2700);
    }, i * 150);
  }
}
