(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = reducedMotion.matches;
  const motionButton = document.querySelector('#motion-toggle');
  function applyMotion() {
    document.documentElement.classList.toggle('motion-paused', motionPaused);
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.textContent = motionPaused ? 'Bật chuyển động ▷' : 'Tạm dừng chuyển động Ⅱ';
  }
  applyMotion();
  motionButton.addEventListener('click', () => { motionPaused = !motionPaused; applyMotion(); });
  const onMotionPreferenceChange = event => {motionPaused = event.matches; applyMotion();};
  if (typeof reducedMotion.addEventListener === 'function') reducedMotion.addEventListener('change', onMotionPreferenceChange);
  else if (typeof reducedMotion.addListener === 'function') reducedMotion.addListener(onMotionPreferenceChange);
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

    const cursor = document.querySelector('.paper-cursor');
    const trail = document.querySelector('.cursor-trail');
    let cursorX = innerWidth / 2, cursorY = innerHeight / 2, previousX = cursorX, angle = -18;
    document.addEventListener('pointermove', event => {
      const dx = event.clientX - previousX;
      const dy = event.clientY - cursorY;
      if (Math.abs(dx) + Math.abs(dy) > 2) angle = Math.atan2(dy, dx) * 180 / Math.PI;
      previousX = cursorX; cursorX = event.clientX; cursorY = event.clientY;
      cursor.style.setProperty('--cursor-x', `${cursorX}px`);
      cursor.style.setProperty('--cursor-y', `${cursorY}px`);
      cursor.style.setProperty('--cursor-angle', `${angle}deg`);
      trail.style.setProperty('--trail-x', `${cursorX}px`);
      trail.style.setProperty('--trail-y', `${cursorY}px`);
      document.documentElement.classList.add('cursor-ready');
    });
    document.addEventListener('pointerover', event => cursor.classList.toggle('cursor-hover', Boolean(event.target.closest('a,button'))));

    document.querySelectorAll('.world-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (motionPaused) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--card-rx', `${-((event.clientY - rect.top) / rect.height - .5) * 9}deg`);
        card.style.setProperty('--card-ry', `${((event.clientX - rect.left) / rect.width - .5) * 11}deg`);
        card.style.setProperty('--shine-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty('--shine-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--card-rx', '0deg');
        card.style.setProperty('--card-ry', '0deg');
      });
    });
  }
  const video = document.querySelector('#brand-film');
  function playFilm() {document.querySelector('#film').scrollIntoView({behavior:motionPaused?'instant':'smooth'});video.currentTime=0;video.play().catch(()=>video.focus());}
  document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',playFilm));
  const worlds = {
    fairytale: {label:'TỦ SÁCH TRÍ TƯỞNG TƯỢNG',title:'Xứ sở cổ tích',description:'Mở một cuốn sách Cánh Giấy, lâu đài hiện lên và người bạn lạ xuất hiện bên đường. Ở xứ sở cổ tích, lòng tốt và lòng dũng cảm có thể mở những cánh cửa mà phép màu chưa chắc mở được.',question:'Nếu bước vào một câu chuyện cổ tích, con muốn mang theo điều gì — và vì sao?',alt:'Lâu đài trong thế giới cổ tích Cánh Giấy'},
    space: {label:'TỦ SÁCH KHOA HỌC',title:'Chạm những vì sao',description:'Mở sách, đội chiếc mũ phi hành gia tưởng tượng và nhìn Trái Đất từ thật xa. Với Cánh Giấy, một câu hỏi nhỏ có thể trở thành đường bay đến những khám phá lớn lao.',question:'Nếu được gửi một lời nhắn từ Trái Đất đến một hành tinh xa, con sẽ kể điều gì?',alt:'Hai bạn nhỏ khám phá không gian bên Trái Đất'},
    forest: {label:'TỦ SÁCH THIÊN NHIÊN',title:'Khu rừng bí mật',description:'Lật từng trang, lắng nghe tiếng lá, quan sát một dấu chân và gặp một người bạn mới. Cánh Giấy nhắc em rằng thiên nhiên luôn có điều thú vị dành cho những người đọc biết để ý.',question:'Con sẽ làm gì để chuyến khám phá của mình không làm phiền những người bạn trong rừng?',alt:'Các bạn nhỏ cùng người bạn xanh trong khu rừng'},
    friends: {label:'TỦ SÁCH TÌNH BẠN',title:'Cùng nhau lớn lên',description:'Có cuốn sách khiến ta bật cười, có cuốn giúp ta hiểu cảm xúc của một người bạn. Đọc Cánh Giấy cùng nhau là học cách lắng nghe, sẻ chia và nhìn thế giới từ nhiều góc nhìn.',question:'Con có câu chuyện nào muốn kể cho một người bạn hôm nay không?',alt:'Nhóm bạn nhỏ cùng nhau đọc sách'}
  };
  const dialog = document.querySelector('#world-dialog');
  let previousFocus;
  document.querySelectorAll('[data-world]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.world,data=worlds[key];previousFocus=button;
    document.querySelector('#dialog-image').src=`./assets/${key}-v2.webp`;
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

  const leaves = [...document.querySelectorAll('.book-leaf')];
  const book = document.querySelector('#flip-book');
  const progress = document.querySelector('#book-progress');
  let currentLeaf = 0;
  const pageLabels = ['Bìa sách', 'Chuyến 1 · Cổ tích & Vũ trụ', 'Chuyến 2 · Thiên nhiên & Tình bạn', 'Trang cuối · Bay tiếp'];
  function renderBook() {
    leaves.forEach((leaf, index) => {
      const flipped = index < currentLeaf;
      const visibleLeft = index === currentLeaf - 1;
      const visibleRight = index === currentLeaf;
      leaf.classList.toggle('flipped', flipped);
      leaf.classList.toggle('visible-left', visibleLeft);
      leaf.classList.toggle('visible-right', visibleRight);
      leaf.classList.toggle('page-hidden', !visibleLeft && !visibleRight);
      leaf.setAttribute('aria-pressed', String(flipped));
      leaf.setAttribute('aria-hidden', String(!visibleLeft && !visibleRight));
      leaf.tabIndex = visibleLeft || visibleRight ? 0 : -1;
      leaf.style.zIndex = String(flipped ? leaves.length + index + 3 : leaves.length - index + 3);
    });
    book.classList.toggle('book-open', currentLeaf > 0);
    progress.textContent = pageLabels[currentLeaf];
    document.querySelector('#book-prev').disabled = currentLeaf === 0;
    document.querySelector('#book-next').disabled = currentLeaf === leaves.length;
  }
  function nextPage() { if (currentLeaf < leaves.length) { currentLeaf += 1; renderBook(); } }
  function previousPage() { if (currentLeaf > 0) { currentLeaf -= 1; renderBook(); } }
  document.querySelector('#book-next').addEventListener('click', nextPage);
  document.querySelector('#book-prev').addEventListener('click', previousPage);
  leaves.forEach((leaf, index) => leaf.addEventListener('click', () => index < currentLeaf ? previousPage() : nextPage()));
  renderBook();
})();
