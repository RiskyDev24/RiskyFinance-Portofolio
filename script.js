// RiskyFinance - frontend only
// features: nav toggle, animated counters, chart (Chart.js), contact demo

// NAV TOGGLE (mobile)
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle && navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// SIMPLE SMOOTH SCROLL FOR ANCHORS
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el){
        const offset = 72; // header height
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({top, behavior:'smooth'});
      }
      // close mobile nav
      nav.classList.remove('open');
    }
  });
});

// ANIMATED COUNTERS (count up)
function animateCount(el, to, duration=1400, prefix=''){
  let start = 0;
  const stepTime = Math.max(16, Math.floor(duration / (to/10 || 1)));
  const startTime = performance.now();
  function tick(now){
    const progress = Math.min(1, (now - startTime) / duration);
    const value = Math.floor(progress * to);
    el.textContent = prefix + value.toLocaleString('id-ID');
    if(progress < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + to.toLocaleString('id-ID');
  }
  requestAnimationFrame(tick);
}

// INIT STATS
const aumEl = document.getElementById('aum');
const investorEl = document.getElementById('investor');
const roiEl = document.getElementById('roi');

function initStats(){
  // simulated numbers
  const aum = 124500000; // Rp
  const investors = 5234;
  const roi = 8.7; // %
  aumEl && animateCount(aumEl, aum, 1600, 'Rp ');
  investorEl && animateCount(investorEl, investors, 1200);
  if(roiEl){
    let start=0, duration=1200, t0=performance.now();
    function tick(now){
      const p = Math.min(1,(now-t0)/duration);
      const val = (p*roi).toFixed(1);
      roiEl.textContent = val + '%';
      if(p<1) requestAnimationFrame(tick);
      else roiEl.textContent = roi.toFixed(1) + '%';
    }
    requestAnimationFrame(tick);
  }
}

// ACTIVITY LIST
const activityList = document.getElementById('activityList') || document.getElementById('activityList');
function loadActivity(){
  const data = [
    'Pembelian paket Growth Fund — Rp 1.200.000',
    'Topup user: Rp 500.000',
    'Withdraw processed — Rp 250.000',
    'New investor registered',
    'Auto-rebalance executed'
  ];
  const ul = document.getElementById('activityList') || document.querySelector('.activity-list');
  if(!ul) return;
  ul.innerHTML = '';
  data.forEach((t)=>{
    const li = document.createElement('li');
    li.textContent = t;
    ul.appendChild(li);
  });
}

// CHART.JS - Line chart (revenue trend)
function initChart(){
  const ctx = document.getElementById('lineChart');
  if(!ctx) return;
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const data = [4200, 5200, 6100, 5300, 7000, 7600, 9000];
  new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[{
        label:'Net Inflow (k)',
        data,
        borderColor:'#00eaff',
        backgroundColor:'rgba(0,234,255,0.08)',
        tension:0.3,
        pointRadius:3
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      scales:{
        y:{ ticks:{ color:'#cfeff0' }, grid:{ color:'rgba(255,255,255,0.03)'} },
        x:{ ticks:{ color:'#9fb4bb' }, grid:{ display:false } }
      },
      plugins:{ legend:{ display:false } }
    }
  });
}

// CONTACT FORM (demo)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Terima kasih bro! Pesanmu sudah dikirim (demo).');
    contactForm.reset();
  });
}

// ON LOAD
window.addEventListener('load', ()=>{
  initStats();
  loadActivity();
  initChart();
});
