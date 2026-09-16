(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = reducedMotion.matches;
  let keyboardNavigation = false;
  document.addEventListener('keydown', event => {
    if (['Tab', 'Enter', ' '].includes(event.key)) {
      keyboardNavigation = true;
      document.documentElement.classList.add('keyboard-navigation');
    }
  });
  document.addEventListener('pointerdown', () => {
    keyboardNavigation = false;
    document.documentElement.classList.remove('keyboard-navigation');
  }, true);
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
  const anchorHeadings = {
    '#worlds': '#worlds-title'
  };
  const centeredAnchors = {
    '#story': '#story',
    '#book-demo': '#book-demo',
    '#film': '#film'
  };
  function layoutTop(element) {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
    return top;
  }
  function scrollToPageAnchor(hash, updateHistory = true) {
    const centeredSelector = centeredAnchors[hash];
    const centeredTarget = centeredSelector ? document.querySelector(centeredSelector) : null;
    const target = centeredTarget || document.querySelector(anchorHeadings[hash] || hash);
    if (!target) return;
    const offset = innerWidth <= 600 ? 24 : 48;
    const viewportHeight = document.documentElement.clientHeight;
    const fitsViewport = centeredTarget && centeredTarget.offsetHeight <= viewportHeight - offset * 2;
    const centeredTop = centeredTarget
      ? layoutTop(centeredTarget) - (fitsViewport ? (viewportHeight - centeredTarget.offsetHeight) / 2 : offset)
      : layoutTop(target) - offset;
    const top = hash === '#home' ? 0 : Math.max(0, centeredTop);
    window.scrollTo({top, behavior: motionPaused ? 'auto' : 'smooth'});
    if (updateHistory && location.hash !== hash) history.pushState(null, '', hash);
  }
  document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(link => link.addEventListener('click', event => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    event.preventDefault();
    scrollToPageAnchor(hash);
  }));
  window.addEventListener('popstate', () => {if (location.hash) scrollToPageAnchor(location.hash, false);});
  window.addEventListener('load', () => {if (location.hash && location.hash !== '#main') scrollToPageAnchor(location.hash, false);}, {once:true});
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});}, {threshold:0.07});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('js-motion');
  }
  const stars = document.querySelector('.hero-stars');
  for(let i = 0; i < 23; i++) {const s = document.createElement('i');if(i % 4 === 0)s.classList.add('five-point');s.style.left = `${(i*37+9)%98}%`;s.style.top = `${(i*19+4)%93}%`;s.style.setProperty('--duration', `${3+i%5}s`);s.style.setProperty('--delay', `${-i*.7}s`);stars.appendChild(s);}
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
  function playFilm() {scrollToPageAnchor('#film');video.currentTime=0;video.play().catch(()=>video.focus());}
  document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',playFilm));
  const worlds = {
    fairytale: {label:'TỦ SÁCH TRÍ TƯỞNG TƯỢNG',title:'Xứ sở cổ tích',description:'Mở một cuốn sách Cánh Giấy, lâu đài hiện lên và người bạn lạ xuất hiện bên đường. Ở xứ sở cổ tích, lòng tốt và lòng dũng cảm có thể mở những cánh cửa mà phép màu chưa chắc mở được.',question:'Nếu bước vào một câu chuyện cổ tích, con muốn mang theo điều gì — và vì sao?',alt:'Lâu đài trong thế giới cổ tích Cánh Giấy'},
    space: {label:'TỦ SÁCH KHOA HỌC',title:'Chạm những vì sao',description:'Mở sách, đội chiếc mũ phi hành gia tưởng tượng và nhìn Trái Đất từ thật xa. Với Cánh Giấy, một câu hỏi nhỏ có thể trở thành đường bay đến những khám phá lớn lao.',question:'Nếu được gửi một lời nhắn từ Trái Đất đến một hành tinh xa, con sẽ kể điều gì?',alt:'Hai bạn nhỏ khám phá không gian bên Trái Đất'},
    forest: {label:'TỦ SÁCH THIÊN NHIÊN',title:'Khu rừng bí mật',description:'Lật từng trang, lắng nghe tiếng lá, quan sát một dấu chân và gặp một người bạn mới. Cánh Giấy nhắc em rằng thiên nhiên luôn có điều thú vị dành cho những người đọc biết để ý.',question:'Con sẽ làm gì để chuyến khám phá của mình không làm phiền những người bạn trong rừng?',alt:'Các bạn nhỏ cùng người bạn xanh trong khu rừng'},
    friends: {label:'TỦ SÁCH TÌNH BẠN',title:'Cùng nhau lớn lên',description:'Có cuốn sách khiến ta bật cười, có cuốn giúp ta hiểu cảm xúc của một người bạn. Đọc Cánh Giấy cùng nhau là học cách lắng nghe, sẻ chia và nhìn thế giới từ nhiều góc nhìn.',question:'Con có câu chuyện nào muốn kể cho một người bạn hôm nay không?',alt:'Nhóm bạn nhỏ cùng nhau đọc sách'}
  };
  const dialog = document.querySelector('#world-dialog');
  let previousFocus;
  let restoreDialogFocus = false;
  let dialogCloseTimer;
  let afterDialogClose;
  function closeWorldDialog(callback) {
    if (!dialog.open) { callback?.(); return; }
    clearTimeout(dialogCloseTimer);
    afterDialogClose = callback;
    if (motionPaused) { dialog.close(); return; }
    dialog.classList.add('is-closing');
    // This is modeless, so close immediately and return pointer control to the
    // page instead of keeping a fading layer over the user's content.
    dialog.close();
  }
  document.querySelectorAll('[data-world]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.world,data=worlds[key];previousFocus=button;restoreDialogFocus=keyboardNavigation;
    document.querySelector('#dialog-image').src=`./assets/${key}.gif`;
    document.querySelector('#dialog-image').alt=data.alt;
    document.querySelector('#dialog-label').textContent=data.label;
    document.querySelector('#dialog-title').textContent=data.title;
    document.querySelector('#dialog-description').textContent=data.description;
    document.querySelector('#dialog-question').textContent=data.question;
    dialog.classList.remove('is-closing');
    dialog.classList.add('is-opening');
    // Keep the main page live behind the detail card: the modeless dialog
    // preserves scrolling, pointer movement, and the page context.
    dialog.show();
    requestAnimationFrame(()=>requestAnimationFrame(()=>dialog.classList.remove('is-opening')));
  }));
  document.addEventListener('keydown', event=>{if(event.key==='Escape' && dialog.open) closeWorldDialog();});
  document.addEventListener('pointerdown', event=>{
    if(dialog.open && !dialog.contains(event.target) && !event.target.closest('[data-world]')) closeWorldDialog();
  }, true);
  dialog.addEventListener('close',()=>{
    clearTimeout(dialogCloseTimer);
    dialog.classList.remove('is-opening','is-closing');
    if (restoreDialogFocus) previousFocus?.focus({preventScroll:true});
    else { previousFocus?.blur(); if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); }
    restoreDialogFocus=false;
    const callback=afterDialogClose;afterDialogClose=undefined;callback?.();
  });

  const leaves = [...document.querySelectorAll('.book-leaf')];
  const book = document.querySelector('#flip-book');
  const progress = document.querySelector('#book-progress');
  let currentLeaf = 0;
  const pageLabels = ['Bìa sách', 'Chương 1 · Lời gọi', 'Chương 2 · Thành phố ngủ quên', 'Chương 3 · Dũng cảm', 'Trang kết · Sẻ chia'];
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
  book.addEventListener('click', event => {
    // Rotated 3D pages can be visible while their hit area falls through to the
    // book container. Use the clicked half as a reliable pointer/touch fallback.
    if (event.target.closest('.book-leaf')) return;
    const bounds = book.getBoundingClientRect();
    if (event.clientX < bounds.left + bounds.width / 2) previousPage();
    else nextPage();
  });
  renderBook();
})();
