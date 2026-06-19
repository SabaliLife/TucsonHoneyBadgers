/* Honey Badgers — photo lightbox + label cleanup. Shared across profile pages,
   the roster gallery, etc. Click any profile/gallery photo to enlarge it and
   arrow through the rest. Injects its own CSS so no stylesheet bump is needed. */
(function () {
  var css = [
    '.pf-photo img,.gallery .shot img{cursor:zoom-in;}',
    '.gallery .shot:has(img) span{display:none;}',
    '.lb-ov{position:fixed;inset:0;background:rgba(8,6,2,.94);display:none;align-items:center;justify-content:center;z-index:2000;}',
    '.lb-ov.open{display:flex;}',
    '.lb-ov img{max-width:88vw;max-height:84vh;object-fit:contain;border:2px solid var(--honey,#f7a900);border-radius:10px;box-shadow:0 12px 44px rgba(0,0,0,.6);}',
    '.lb-ov button{position:absolute;background:rgba(0,0,0,.45);color:var(--honey,#f7a900);border:1px solid rgba(247,169,0,.4);font-family:Anton,sans-serif;cursor:pointer;border-radius:6px;line-height:1;}',
    '.lb-ov button:hover{background:var(--honey,#f7a900);color:#160f00;}',
    '.lb-x{top:18px;right:18px;width:46px;height:46px;font-size:26px;}',
    '.lb-prev,.lb-next{top:50%;transform:translateY(-50%);width:50px;height:66px;font-size:34px;}',
    '.lb-prev{left:14px;}.lb-next{right:14px;}',
    '@media(max-width:560px){.lb-prev,.lb-next{width:40px;height:54px;font-size:26px;}}'
  ].join('');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var imgs = Array.prototype.slice.call(
    document.querySelectorAll('.pf-photo img, .gallery .shot img')
  );
  if (!imgs.length) return;

  var ov = document.createElement('div');
  ov.className = 'lb-ov';
  ov.innerHTML =
    '<button class="lb-x" aria-label="Close">×</button>' +
    '<button class="lb-prev" aria-label="Previous">‹</button>' +
    '<img alt="">' +
    '<button class="lb-next" aria-label="Next">›</button>';
  document.body.appendChild(ov);

  var big = ov.querySelector('img');
  var single = imgs.length < 2;
  if (single) {
    ov.querySelector('.lb-prev').style.display = 'none';
    ov.querySelector('.lb-next').style.display = 'none';
  }
  var idx = 0;

  function show(n) {
    idx = (n + imgs.length) % imgs.length;
    big.src = imgs[idx].currentSrc || imgs[idx].src;
    big.alt = imgs[idx].alt || '';
  }
  function open(n) {
    show(n);
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  imgs.forEach(function (im, i) {
    im.addEventListener('click', function () { open(i); });
  });
  ov.querySelector('.lb-x').addEventListener('click', close);
  ov.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
  ov.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
  ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
  document.addEventListener('keydown', function (e) {
    if (!ov.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
