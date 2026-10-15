/* Mode projection : transitions romantiques, photos animées, cœur, pétales, étoiles, feux d'artifice, générique */
(() => {
    const { D, $, audio } = W; let on = false, i = 0, timer, paused = false, idle, scenes, tc = 0, fr, P = [], lt = 0, mode = '';
    const $$ = (s, r = document) => [...r.querySelectorAll(s)], T = ['fade', 'push', 'zoom', 'wipe', 'flip', 'rise'];
    const HM = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 29'%3E%3Cpath d='M16 28C16 28 2 18 2 9 2 4 6 1 10 1 13 1 15 3 16 5 17 3 19 1 22 1 26 1 30 4 30 9 30 18 16 28 16 28Z'/%3E%3C/svg%3E")`;
    const FM = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `%3Cellipse cx='50' cy='24' rx='14' ry='26' transform='rotate(${a} 50 50)'/%3E`).join('')}%3Ccircle cx='50' cy='50' r='20'/%3E%3C/svg%3E")`;
    const build = () => {
        const S = [{ img: D.hero, t: D.a.nom + ' & ' + D.b.nom, p: D.intro, tr: 'heart', fx: 'petals', imp: 1 }];
        D.chap.forEach((c, n) => S.push({ img: D.img(c.img[0]), t: c.t, p: c.txt, tr: ['push', 'veil', 'flower'][n], fx: n == 2 ? 'petals' : '', imp: n == 2 }));
        const AL = { 'Cérémonie': ['flower', 'petals', 1], 'Fiançailles': ['veil', 'stars', 0], 'Réception': ['wipe', 'fw', 0], 'Rencontre': ['zoom', '', 0], 'Préparatifs': ['rise', 'petals', 0], 'Séance photo': ['flip', 'stars', 0] };
        D.photos.forEach(p => { const a = AL[p.album] || []; S.push({ img: p.src, t: p.cap, p: p.album + ', ' + p.date, tr: a[0], fx: a[1], imp: a[2] }) });
        D.programme.slice(5).forEach((g, n) => S.push({ img: D.img(n + 3), t: g[1], p: g[0] + ', ' + g[2], tr: 'fade', fx: 'stars' }));
        S.push({ img: D.img(2), t: D.sign, p: D.final, tr: 'heart', fx: 'fw', imp: 1 }); S.push({ cr: 1, tr: 'fade' }); scenes = S
    };
    const credits = () => `<div class="cr2"><div class="rl"><p class="script">Un film d'amour</p><h2>${D.a.nom} & ${D.b.nom}</h2><p>${D.date}</p><h4>Les mariés</h4><p>${D.a.nom}, ${D.b.nom}</p><h4>Les témoins</h4><p>${D.temoins.map(t => t.n).join(' · ')}</p><h4>Les parents</h4><p>${D.parents.map(t => t.n).join(' · ')}</p><h4>Avec tout l'amour de</h4><p>${D.proches.map(t => t.n).join(' · ')}</p><h4>Un site signé</h4><h2>${D.signature}</h2><p class="script">${D.sign}</p></div></div>`;
    const fx = m => {
        cancelAnimationFrame(fr); const c = $('#fw'); if (!c) return; const x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight; x.clearRect(0, 0, c.width, c.height); P = []; mode = m; if (!m || W.RM) return;
        const col = ['#c9a86a', '#f3ead9', '#e8c9c4', '#e8d28c'], R = Math.random, w = c.width, h = c.height;
        const burst = () => { const cx = w * (.15 + R() * .7), cy = h * (.12 + R() * .35), k = col[R() * 4 | 0]; for (let n = 0; n < 80; n++) { const a = 6.283 * n / 80, v = 1.5 + R() * 3; P.push({ t: 'f', x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, k }) } };
        const loop = t => {
            fr = requestAnimationFrame(loop); const g = t - lt;
            if (mode == 'fw' && g > 1100) { lt = t; burst() }
            if (mode == 'stars' && g > 130) { lt = t; P.push({ t: 's', x: w * (.3 + R() * .8), y: -20, vx: -2.5 - R() * 2, vy: 4 + R() * 3, l: 1 }) }
            if (mode == 'petals' && g > 220) { lt = t; P.push({ t: 'p', x: R() * w, y: -30, vy: 1 + R() * 1.4, a: R() * 6, va: (R() - .5) * .05, s: 8 + R() * 8, ph: R() * 6, l: 1, k: R() < .5 ? '#e8c9c4' : '#f6e3e0' }) }
            x.clearRect(0, 0, w, h); P = P.filter(q => q.l > 0 && q.y < h + 40 && q.x > -60 && q.x < w + 60);
            P.forEach(q => {
                if (q.t == 'p') { q.ph += .02; q.x += Math.sin(q.ph) * 1.2 + .4; q.y += q.vy; q.a += q.va; x.save(); x.translate(q.x, q.y); x.rotate(q.a); x.globalAlpha = .85; x.fillStyle = q.k; x.beginPath(); x.ellipse(0, 0, q.s, q.s * .55, 0, 0, 6.283); x.fill(); x.restore() }
                else if (q.t == 's') { q.x += q.vx; q.y += q.vy; const gr = x.createLinearGradient(q.x, q.y, q.x - q.vx * 12, q.y - q.vy * 12); gr.addColorStop(0, 'rgba(255,240,200,.95)'); gr.addColorStop(1, 'rgba(255,240,200,0)'); x.strokeStyle = gr; x.lineWidth = 2.2; x.beginPath(); x.moveTo(q.x, q.y); x.lineTo(q.x - q.vx * 12, q.y - q.vy * 12); x.stroke() }
                else { q.x += q.vx; q.y += q.vy; q.vy += .035; q.vx *= .985; q.vy *= .985; q.l -= .011; x.globalAlpha = Math.max(q.l, 0); x.strokeStyle = q.k; x.lineWidth = 2.4; x.beginPath(); x.moveTo(q.x, q.y); x.lineTo(q.x - q.vx * 2.5, q.y - q.vy * 2.5); x.stroke(); x.globalAlpha = 1 }
            })
        };
        if (m == 'fw') burst(); fr = requestAnimationFrame(loop)
    };
    const show = n => {
        i = (n + scenes.length) % scenes.length; const s = scenes[i], el = $('#proj'), t = s.tr || T[tc++ % T.length], dur = s.cr ? 27000 : 8000;
        const d = document.createElement('div'); d.className = 'sc in-' + t;
        if (s.cr) d.innerHTML = credits(); else { d.innerHTML = '<div class="kb k' + (i % 4) + '"></div>'; d.firstChild.style.backgroundImage = `url(${s.img}),linear-gradient(135deg,#3b2f2a,#8a6f55)` }
        $$('.sc', el).forEach(o => { o.className = 'sc out-' + t; setTimeout(() => o.remove(), 2500) }); el.insertBefore(d, $('.sh'));
        const c = $('.cap', el); c.style.animation = 'none'; c.offsetWidth; c.style.animation = ''; c.style.display = s.cr ? 'none' : ''; if (!s.cr) { $('h2', c).textContent = s.t; $('p', c).textContent = s.p }
        $('.num', el).textContent = (i + 1) + ' / ' + scenes.length; $('.hb', el).classList.toggle('on', !!s.imp); fx(s.fx || '');
        const b = $('.bar', el); b.style.transition = 'none'; b.style.width = '0'; requestAnimationFrame(() => requestAnimationFrame(() => { b.style.transition = 'width ' + dur / 1000 + 's linear'; b.style.width = paused ? '0' : '100%' }));
        clearTimeout(timer); if (!paused) timer = setTimeout(() => show(i + 1), dur)
    };
    const exit = () => { fx(''); on = false; clearTimeout(timer); $('#proj').classList.remove('on'); document.fullscreenElement && document.exitFullscreen().catch(() => { }) };
    W.projection = () => {
        if (on) return exit(); on = true; paused = false; tc = 0; build();
        if (!$('#proj')) document.body.insertAdjacentHTML('beforeend', `<div id="proj"><div class="sh"></div><canvas id="fw"></canvas><div class="hb"></div><div class="num"></div><div class="cap"><h2></h2><p></p></div><div class="bar"></div><div class="pc"><button class="ib" data-c="p">‹</button><button class="ib" data-c="pp">Pause</button><button class="ib" data-c="n">›</button><button class="ib" data-c="m">♪</button><button class="ib" data-c="x">Quitter</button></div></div>`);
        const el = $('#proj'); el.style.setProperty('--hm', HM); el.style.setProperty('--fm', FM); el.classList.add('on'); document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => { });
        $$('.sc', el).forEach(s => s.remove()); show(0);
        el.onclick = e => { const c = e.target.dataset.c; if (c == 'x') exit(); if (c == 'p') show(i - 1); if (c == 'n') show(i + 1); if (c == 'm') W.toggle(); if (c == 'pp') { paused = !paused; e.target.textContent = paused ? 'Reprendre' : 'Pause'; show(i) } };
        el.onmousemove = () => { el.classList.remove('idle'); clearTimeout(idle); idle = setTimeout(() => el.classList.add('idle'), 3000) }
    };
    addEventListener('keydown', e => { if (!on) return; if (e.key == 'Escape') exit(); if (e.key == 'ArrowRight') show(i + 1); if (e.key == 'ArrowLeft') show(i - 1); if (e.key == ' ') { e.preventDefault(); $('[data-c=pp]').click() } });
    document.addEventListener('fullscreenchange', () => { if (on && !document.fullscreenElement) exit() });
    W.boot();
})();
