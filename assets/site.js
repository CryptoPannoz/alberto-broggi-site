/* bebroggi.it — comportamenti condivisi tra home IT e EN.
   Tutto è opzionale: senza JS la pagina resta leggibile e completa. */
(function () {
  var doc = document.documentElement;
  var lang = doc.lang === 'en' ? 'en' : 'it';
  var locale = lang === 'en' ? 'en-GB' : 'it-IT';
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function onSeen(el, fn, opts) {
    if (!hasIO) { fn(el); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } });
    }, opts || { threshold: .15, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
  }

  /* ── Anno nel piede ── */
  var y = $('#y');
  if (y) y.textContent = new Date().getFullYear();

  /* ── Ora di Trieste nella testata ── */
  var clock = $('[data-clock]');
  if (clock && window.Intl) {
    var fmt = new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit' });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 20000);
  }

  /* ── Filo d'inchiostro sotto la testata: quanto hai letto ── */
  var mast = $('.masthead');
  if (mast) {
    var ticking = false;
    var setP = function () {
      var h = doc.scrollHeight - innerHeight;
      mast.style.setProperty('--p', h > 0 ? Math.min(1, scrollY / h).toFixed(4) : 0);
      ticking = false;
    };
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(setP); } }, { passive: true });
    setP();
  }

  /* ── Voce di menu della sezione in vista ── */
  var navLinks = $$('.nav a[href^="#"]');
  if (navLinks.length && hasIO) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var navIO = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        var a = byId[e.target.id];
        if (a) a.classList.toggle('is-here', e.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) navIO.observe(s); });
  }

  /* ── Titoli: parola per parola ── */
  $$('[data-words]').forEach(function (el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span'); w.className = 'w';
            var s = document.createElement('span'); s.textContent = part;
            s.style.setProperty('--d', (i++ * 0.045).toFixed(3) + 's');
            w.appendChild(s); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) { walk(n); }
      });
    })(el);
    onSeen(el, function (t) { t.classList.add('in'); }, { threshold: .1 });
  });

  /* ── Filetti, tendine e salite ── */
  $$('.sec').forEach(function (s) { onSeen(s, function (t) { t.classList.add('in'); }, { threshold: 0, rootMargin: '0px 0px -10% 0px' }); });
  $$('.rows').forEach(function (r) {
    $$(':scope > *', r).forEach(function (row, i) { row.style.setProperty('--d', Math.min(i * .06, .6) + 's'); });
    onSeen(r, function (t) { t.classList.add('in'); });
  });
  $$('[data-stagger]').forEach(function (g) {
    $$(':scope > *', g).forEach(function (c, i) {
      c.setAttribute(g.getAttribute('data-stagger') || 'data-rise', '');
      c.style.setProperty('--d', Math.min(i * .08, .48) + 's');
    });
  });
  $$('[data-wipe], [data-rise], .radar__bars').forEach(function (el) { onSeen(el, function (t) { t.classList.add('in'); }); });

  /* ── Contamiglia: le cifre girano come un rullo ── */
  function odometer(el) {
    var text = el.getAttribute('data-odo') || el.textContent;
    if (still) { el.textContent = text; return; }
    el.textContent = '';
    el.classList.add('odo');
    el.setAttribute('aria-label', text);
    var cols = [];
    text.split('').forEach(function (ch, i) {
      if (!/\d/.test(ch)) { var s = document.createElement('span'); s.textContent = ch === ' ' ? '\u00a0' : ch; s.setAttribute('aria-hidden', 'true'); el.appendChild(s); return; }
      var d = document.createElement('span'); d.className = 'odo__d'; d.setAttribute('aria-hidden', 'true');
      var col = document.createElement('span'); col.className = 'odo__col';
      for (var k = 0; k < 20; k++) { var n = document.createElement('span'); n.textContent = k % 10; col.appendChild(n); }
      col.style.transitionDelay = (i * 0.07) + 's';
      d.appendChild(col); el.appendChild(d);
      cols.push([col, 10 + Number(ch)]);
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      cols.forEach(function (c) { c[0].style.transform = 'translateY(-' + (c[1] * 1.2).toFixed(2) + 'em)'; });
    }); });
  }
  window.bbOdometer = odometer;
  $$('[data-odo]:not([data-sea-total])').forEach(function (el) { onSeen(el, odometer, { threshold: .4 }); });

  /* ── CV velico: somma i data-nm delle regate, poi contamiglia e giro del mondo ── */
  (function () {
    var spans = $$('[data-nm]');
    if (!spans.length) return;
    var nf = function (n) { return n.toLocaleString(locale, { useGrouping: 'always' }); };
    var total = 0, years = [];
    spans.forEach(function (el) {
      var nm = Number(el.getAttribute('data-nm')) || 0;
      var m = el.textContent.match(/(19|20)\d\d/);
      total += nm;
      el.title = '≈ ' + nf(nm) + (lang === 'en' ? ' nm' : ' miglia');
      if (m) years.push(Number(m[0]));
    });
    var pct = total / 21600;
    var set = function (sel, v) { $$(sel).forEach(function (el) { el.textContent = v; }); };
    var tot = $('[data-sea-total]');
    set('[data-sea-total]', nf(total));
    if (tot) { tot.setAttribute('data-odo', nf(total)); onSeen(tot, odometer, { threshold: .4 }); }
    set('[data-sea-count]', spans.length);
    set('[data-sea-pct]', Math.round(pct * 100) + '%');
    if (years.length) set('[data-sea-years]', Math.min.apply(null, years) + '–' + Math.max.apply(null, years));
    var ring = $('.ring');
    if (ring) {
      var arc = $('.arc', ring), boat = $('.boat', ring);
      var len = 2 * Math.PI * 120;
      arc.style.strokeDasharray = len;
      arc.style.strokeDashoffset = len;
      boat.style.transform = 'rotate(0deg)';
      onSeen(ring, function () {
        arc.style.strokeDashoffset = (len * (1 - Math.min(pct, 1))).toFixed(1);
        boat.style.transform = 'rotate(' + (Math.min(pct, 1) * 360).toFixed(1) + 'deg)';
      }, { threshold: .4 });
    }
  })();

  /* ── Video: girano solo quando si vedono ── */
  var vids = $$('video[data-auto]');
  vids.forEach(function (v) { v.muted = true; });
  if (hasIO) {
    var vIO = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting && !still) { var p = e.target.play(); if (p) p.catch(function () {}); }
        else e.target.pause();
      });
    }, { threshold: .25 });
    vids.forEach(function (v) { vIO.observe(v); });
  }

  /* ── Righe del lavoro: /#noura (o un vecchio link ai pop-up) apre la scheda ── */
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id && document.getElementById(id);
    if (el && el.tagName === 'DETAILS') { el.open = true; setTimeout(function () { el.scrollIntoView(); }, 30); }
  }
  openFromHash();
  addEventListener('hashchange', openFromHash);

  /* ── Flusso della dashboard: un passo alla volta ── */
  $$('.flow').forEach(function (f) {
    var steps = $$('span', f), k = 0;
    if (still || !steps.length) return;
    setInterval(function () { steps.forEach(function (s, i) { s.classList.toggle('on', i === k); }); k = (k + 1) % steps.length; }, 900);
  });

  /* ── La macchina: un dato disordinato diventa una riga pulita ── */
  (function () {
    var box = $('[data-machine]');
    var src = $('#machine-data');
    if (!box || !src) return;
    var data = JSON.parse(src.textContent);
    var raw = $('.machine__raw', box), out = $('.machine__out', box), tabs = $('.machine__tabs', box);
    var bar = $('.machine__bar i', box), count = $('[data-machine-count]', box);
    var cur = 0, timers = [], visible = false;

    tabs.innerHTML = data.map(function (d, i) {
      return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '">' + d.tab + '</button>';
    }).join('');

    function clear() { timers.forEach(clearTimeout); timers = []; }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    function render(i, animate) {
      clear();
      cur = i;
      var d = data[i];
      $$('button', tabs).forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
      if (count) count.textContent = (i + 1) + ' / ' + data.length;
      out.innerHTML = d.out.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd data-v="' + esc(r[1]) + '"></dd></div>'; }).join('');
      var rows = $$('div', out);
      if (!animate) {
        raw.textContent = d.raw; raw.classList.add('done');
        rows.forEach(function (r) { r.classList.add('on'); $('dd', r).textContent = $('dd', r).getAttribute('data-v'); });
        if (bar) { bar.style.transition = 'none'; bar.style.transform = 'scaleX(1)'; }
        return;
      }
      raw.textContent = ''; raw.classList.remove('done');
      box.classList.remove('is-working');
      if (bar) { bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)'; }
      var t = 0;
      d.raw.split('').forEach(function (ch, k) { later(function () { raw.textContent += ch; }, t += (ch === ' ' ? 45 : 26)); });
      later(function () { raw.classList.add('done'); box.classList.add('is-working'); }, t += 250);
      rows.forEach(function (r) {
        var dd = $('dd', r), v = dd.getAttribute('data-v');
        later(function () { r.classList.add('on'); }, t += 380);
        v.split('').forEach(function (ch) { later(function () { dd.textContent += ch; }, t += 16); });
      });
      later(function () { box.classList.remove('is-working'); }, t += 200);
      later(function () {
        if (bar) { bar.style.transition = 'transform 3.2s linear'; bar.style.transform = 'scaleX(1)'; }
      }, t);
      later(function () { if (visible) render((cur + 1) % data.length, true); }, t + 3400);
    }

    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-i]');
      if (b) render(Number(b.getAttribute('data-i')), !still);
    });

    render(0, false);
    if (still) return;
    if (!hasIO) { visible = true; render(0, true); return; }
    // Riparte dall'esempio corrente quando torna in vista; si ferma (a riga completa) quando esce.
    new IntersectionObserver(function (en) {
      var v = en[en.length - 1].isIntersecting;
      if (v === visible) return;
      visible = v;
      if (visible) render(cur, true); else render(cur, false);
    }, { threshold: .35 }).observe(box);
  })();

  /* ── Visore per foto e video di "Fuori ufficio" ── */
  (function () {
    var dlg = $('#viewer');
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var items = $$('[data-view]');
    var img = $('img', dlg), vid = $('video', dlg), cap = $('.viewer__cap', dlg), count = $('[data-viewer-count]', dlg);
    var i = 0;
    function show(k) {
      i = (k + items.length) % items.length;
      var el = items[i];
      var media = el.querySelector('img, video');
      var c = el.closest('[data-cap]') || el;
      var capEl = c.querySelector('.card__cap');
      cap.innerHTML = capEl ? capEl.innerHTML : '';
      count.textContent = (i + 1) + ' / ' + items.length;
      if (media.tagName === 'VIDEO') {
        img.hidden = true; img.removeAttribute('src');
        vid.poster = media.poster || '';
        vid.src = media.querySelector('source').src;
        vid.hidden = false; vid.muted = false;
        var p = vid.play(); if (p) p.catch(function () {});
      } else {
        vid.pause(); vid.removeAttribute('src'); vid.hidden = true;
        img.src = media.currentSrc || media.src; img.alt = media.alt; img.hidden = false;
      }
    }
    items.forEach(function (el, k) {
      el.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        show(k); dlg.showModal();
      });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(k); dlg.showModal(); } });
    });
    dlg.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b && b.hasAttribute('data-step')) show(i + Number(b.getAttribute('data-step')));
      else if ((b && b.hasAttribute('data-close')) || e.target === dlg) dlg.close();
    });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(i + 1);
      if (e.key === 'ArrowLeft') show(i - 1);
    });
    var x0 = null;
    dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
    }, { passive: true });
    dlg.addEventListener('close', function () { vid.pause(); vid.removeAttribute('src'); img.removeAttribute('src'); });
  })();
})();
