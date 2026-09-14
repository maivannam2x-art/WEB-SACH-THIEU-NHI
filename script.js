(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = reducedMotion.matches;
  const motionButton = document.querySelector('#motion-toggle');
  const motionImage = document.querySelector('#dream-motion');
  function applyMotion() {
    document.documentElement.classList.toggle('motion-paused', motionPaused);
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.textContent = motionPaused ? 'Bật chuyển động ▷' : 'Tạm dừng chuyển động Ⅱ';
    motionImage.src = motionPaused ? './assets/dream-still.webp' : './assets/paper-dream.webp';
  }
  applyMotion();
  motionButton.addEventListener('click', () => { motionPaused = !motionPaused; applyMotion(); });
  reducedMotion.addEventListener('change', event => {motionPaused = event.matches; applyMotion();});
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Mở menu'); }
  menuButton.addEventListener('click', () => {const open = nav.classList.toggle('open');menuButton.setAttribute('aria-expanded', String(open));menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');});
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {if(e.key === 'Escape') closeMenu();});
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});}, {threshold:0.07});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('js-motion');
  }
  const stars = document.querySelector('.hero-stars');
  for(let i = 0; i < 23; i++) {const s = document.createElement('i');s.style.left = `${(i*37+9)%98}%`;s.style.top = `${(i*19+4)%93}%`;s.style.setProperty('--duration', `${3+i%5}s`);s.style.setProperty('--delay', `${-i*.7}s`);stars.appendChild(s);}
  const hero = document.querySelector('.hero');
  const visual = document.querySelector('.hero-visual');
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) {
    hero.addEventListener('pointermove', e => {if(motionPaused)return;const r = hero.getBoundingClientRect();visual.style.setProperty('--ry', `${((e.clientX-r.left)/r.width-.5)*5}deg`);visual.style.setProperty('--rx', `${-((e.clientY-r.top)/r.height-.5)*4}deg`);});
    hero.addEventListener('pointerleave', () => {visual.style.setProperty('--rx','0deg');visual.style.setProperty('--ry','0deg');});
  }
  const video = document.querySelector('#brand-film');
  function playFilm() {document.querySelector('#film').scrollIntoView({behavior:motionPaused?'instant':'smooth'});video.currentTime=0;video.play().catch(()=>video.focus());}
  document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',playFilm));
  const worlds = {
    fairytale: {label:'TRÍ TƯỞNG TƯỢNG',title:'Xứ sở cổ tích',description:'Một lâu đài hiện lên từ trang sách, một người bạn lạ xuất hiện bên đường. Ở xứ sở cổ tích, lòng tốt và lòng dũng cảm có thể mở những cánh cửa mà phép màu chưa chắc mở được.',question:'Nếu bước vào một câu chuyện cổ tích, con muốn mang theo điều gì — và vì sao?',alt:'Lâu đài trong thế giới cổ tích Cánh Giấy'},
    space: {label:'KHOA HỌC & KHÁM PHÁ',title:'Chạm những vì sao',description:'Đội chiếc mũ phi hành gia tưởng tượng và nhìn Trái Đất từ thật xa. Những trang sách về khoa học bắt đầu bằng một câu hỏi nhỏ, rồi dẫn ta đến những điều lớn lao.',question:'Nếu được gửi một lời nhắn từ Trái Đất đến một hành tinh xa, con sẽ kể điều gì?',alt:'Hai bạn nhỏ khám phá không gian bên Trái Đất'},
    forest: {label:'THIÊN NHIÊN & PHIÊU LƯU',title:'Khu rừng bí mật',description:'Lắng nghe tiếng lá, quan sát một dấu chân, gặp một người bạn mới. Chuyến phiêu lưu trong khu rừng nhắc chúng ta rằng thiên nhiên luôn có điều thú vị dành cho những ai biết để ý.',question:'Con sẽ làm gì để chuyến khám phá của mình không làm phiền những người bạn trong rừng?',alt:'Các bạn nhỏ cùng người bạn xanh trong khu rừng'},
    friends: {label:'TÌNH BẠN & KỸ NĂNG',title:'Cùng nhau lớn lên',description:'Có câu chuyện khiến ta bật cười, có câu chuyện giúp ta hiểu cảm xúc của một người bạn. Đọc cùng nhau là học cách lắng nghe, sẻ chia và nhìn thế giới từ nhiều góc nhìn.',question:'Con có câu chuyện nào muốn kể cho một người bạn hôm nay không?',alt:'Nhóm bạn nhỏ cùng nhau đọc sách'}
  };
  const dialog = document.querySelector('#world-dialog');
  let previousFocus;
  document.querySelectorAll('[data-world]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.world,data=worlds[key];previousFocus=button;
    document.querySelector('#dialog-image').src=`./assets/${key}.webp`;
    document.querySelector('#dialog-image').alt=data.alt;
    document.querySelector('#dialog-label').textContent=data.label;
    document.querySelector('#dialog-title').textContent=data.title;
    document.querySelector('#dialog-description').textContent=data.description;
    document.querySelector('#dialog-question').textContent=data.question;
    dialog.showModal();document.body.style.overflow='hidden';
  }));
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus({preventScroll:true});});
  document.querySelector('#dialog-film').addEventListener('click',()=>{dialog.close();playFilm();});
})();
