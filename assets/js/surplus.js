/* #surplus: stock nobody has bought yet, and the customers it fits. The rows come from the page text (sp_rows),
   the lines are drawn from the lot card to each row (measured, so they follow any layout), and small pellets
   travel along the lines that fit. Plays once when the board is in view; pellets only run while it is on screen.
   Reduced motion: lines drawn, no pellets, nothing moves. */
(() => {
  const board = document.getElementById('sp-board'); if (!board) return;
  const svg = board.querySelector('.sp-flow'), list = board.querySelector('.sp-list'), lot = board.querySelector('.sp-lot');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = matchMedia('(min-width: 1001px)');
  const t = k => window.UI.t(k);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function rows() {
    list.innerHTML = t('sp_rows').map(([name, k, why, src, qty], i) => `
      <li class="sp-row ${k}" style="--i:${i}">
        <span class="sp-pin" aria-hidden="true"></span>
        <div class="sp-who"><b>${esc(name)}</b><p>${esc(why)}</p><small>${esc(src)}</small></div>
        <div class="sp-out">${qty ? `<b>${esc(qty)}</b>` : ''}<em>${esc(t('sp_' + k))}</em></div>
      </li>`).join('');
    requestAnimationFrame(draw);
  }

  // Where the painted container is, in the painting's own pixels (assets/art/unloading.jpg, 1536 x 1024):
  // its right edge (where the pellets leave) and its lower right corner (where the lot tag's string is tied).
  const ART = { w: 1536, h: 1024, out: [472, 648], tie: [452, 692] };
  // the painting is the full-bleed wallpaper behind the hero and the board (.gallery-wallpaper)
  const img = document.querySelector('.gallery-wallpaper img');
  // map a painting pixel to board coordinates, from where the image really is (object-fit: cover, its object-position in %)
  function fromArt([ax, ay]) {
    const r = img.getBoundingClientRect(), b = board.getBoundingClientRect(), k = Math.max(r.width / ART.w, r.height / ART.h);
    const [px, py] = getComputedStyle(img).objectPosition.split(' ').map(v => (parseFloat(v) || 0) / 100);
    return [r.left - b.left + (r.width - ART.w * k) * px + ax * k, r.top - b.top + (r.height - ART.h * k) * py + ay * k];
  }
  // layout positions (offset*), so cards that are still sliding in do not bend the lines
  const pos = el => { let x = 0, y = 0; for (let n = el; n && n !== board; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return [x, y]; };

  // narrow screens: no lines; the tag sits in the flow under the container, on a short string (CSS)
  function placeNarrow() {
    lot.style.marginTop = lot.style.marginLeft = '';
    const [tx, ty] = pos(lot), [ax, ay] = fromArt(ART.tie), room = board.clientWidth - lot.offsetWidth - 2 * tx;
    lot.style.marginTop = `${Math.max(0, Math.round(ay + 34 - ty))}px`;
    lot.style.marginLeft = `${Math.max(0, Math.min(room, Math.round(ax - 22 - tx)))}px`;
    board.classList.add('anchored');
  }

  function draw() {
    lot.style.transform = '';
    if (!wide.matches) { svg.innerHTML = ''; placeNarrow(); return; }
    lot.style.marginTop = lot.style.marginLeft = '';
    svg.setAttribute('viewBox', `0 0 ${board.clientWidth} ${board.clientHeight}`);
    const [x0, y0] = fromArt(ART.out), f = n => n.toFixed(1);
    let html = '';
    // the lot tag hangs below the container, its string tied to the container's lower corner
    const [kx, ky] = fromArt(ART.tie), lx = kx - 34, ly = ky + 46, hx = lx + 22, hy = ly + 14;
    lot.style.transform = `translate3d(${f(lx)}px, ${f(ly)}px, 0)`;
    html += `<path class="string" d="M${f(kx)} ${f(ky)} Q${f((kx + hx) / 2 + 6)} ${f((ky + hy) / 2)} ${f(hx)} ${f(hy)}"/><circle class="knot" cx="${f(kx)}" cy="${f(ky)}" r="2.5"/>`;
    [...list.children].forEach((li, i) => {
      const pin = li.querySelector('.sp-pin'), [px, py] = pos(pin);
      const x1 = px + pin.offsetWidth / 2, y1 = py + pin.offsetHeight / 2, mx = x0 + (x1 - x0) * .55;
      const d = `M${f(x0)} ${f(y0)} C${f(mx)} ${f(y0)} ${f(mx)} ${f(y1)} ${f(x1)} ${f(y1)}`;
      const k = li.classList.contains('no') ? 'no' : li.classList.contains('maybe') ? 'maybe' : 'fit';
      html += `<path class="ln ${k}" d="${d}" pathLength="1" style="--i:${i}"/>`;
      if (k !== 'no' && !reduced) {
        // pellets: evenly spaced in time along the same curve (CSS offset-path)
        const n = k === 'fit' ? 5 : 3;
        for (let j = 0; j < n; j++) html += `<circle class="pel ${k}" r="${k === 'fit' ? 4 : 3.4}" style="offset-path: path('${d}'); --j:${j}; --n:${n}; --i:${i}"/>`;
      }
    });
    svg.innerHTML = html;
    board.classList.add('anchored');
  }

  rows();
  window.UI.onLang(rows);
  let tm; addEventListener('resize', () => { clearTimeout(tm); tm = setTimeout(draw, 120); });
  wide.addEventListener('change', draw);
  document.fonts?.ready.then(draw);
  if (!img.complete) img.addEventListener('load', draw, { once: true });

  // play once when well in view; pellets run only while the board is visible
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) board.classList.add('play');
    board.classList.toggle('run', e.isIntersecting);
  }, { threshold: .2 }).observe(board);

  // "See it in the product": open the push screen with this very stock
  document.querySelector('[data-open-push]')?.addEventListener('click', e => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('dm:open', { detail: { page: 'push', push: 'hdpe' } }));
  });
})();
