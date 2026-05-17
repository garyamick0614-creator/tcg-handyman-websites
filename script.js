(function () {
  'use strict';

  /* ---------- Year stamp ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------- Phone-input formatting ---------- */
  var phone = document.getElementById('f-phone');
  if (phone) {
    phone.addEventListener('input', function () {
      var d = phone.value.replace(/\D/g, '').slice(0, 10);
      if (d.length === 0) { phone.value = ''; return; }
      if (d.length < 4) phone.value = '(' + d;
      else if (d.length < 7) phone.value = '(' + d.slice(0, 3) + ') ' + d.slice(3);
      else phone.value = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
    });
  }

  /* ---------- Smooth-scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Estimate calculator ---------- */
  var PRICING = {
    'drywall':       { small: [125, 300],   medium: [350, 700],    large: [2800, 5500],  time: ['half a day', '1–2 days', '5–10 days'] },
    'plumbing':      { small: [95, 185],    medium: [185, 350],    large: [400, 850],    time: ['under 2 hours', '2–4 hours', 'half a day'] },
    'electrical':    { small: [95, 145],    medium: [145, 285],    large: [285, 650],    time: ['under an hour', '1–3 hours', 'half a day'] },
    'decks':         { small: [185, 385],   medium: [650, 1800],   large: [1800, 4500],  time: ['under a day', '1–3 days', '3–5 days'] },
    'kitchen-bath':  { small: [450, 725],   medium: [1100, 2400],  large: [2800, 7500],  time: ['1 day', '2–5 days', '1–2 weeks'] },
    'installs':      { small: [135, 245],   medium: [385, 685],    large: [685, 1450],   time: ['under 2 hours', 'half a day', '1 day'] }
  };
  var SERVICE_LABEL = {
    'drywall': 'Drywall & paint',
    'plumbing': 'Plumbing fixes',
    'electrical': 'Light electrical',
    'decks': 'Decks & outdoor',
    'kitchen-bath': 'Kitchen / bath remodel',
    'installs': 'Home installs & mounting'
  };
  var SIZE_LABEL = { small: 'Small', medium: 'Medium', large: 'Large' };
  var SIZE_IDX = { small: 0, medium: 1, large: 2 };

  function fmt(n) { return '$' + n.toLocaleString('en-US'); }

  var est = {
    service: 'drywall',
    size: 'medium',
    materials: 'customer'
  };

  function updateEstimate() {
    var row = PRICING[est.service];
    if (!row) return;
    var range = row[est.size];
    var lo = range[0], hi = range[1];
    if (est.materials === 'mike')      { lo = Math.round(lo * 1.15); hi = Math.round(hi * 1.15); }
    else if (est.materials === 'mixed'){ lo = Math.round(lo * 1.07); hi = Math.round(hi * 1.07); }
    var time = row.time[SIZE_IDX[est.size]];
    var serviceEl = document.getElementById('est-out-service');
    var rangeEl   = document.getElementById('est-out-range');
    var metaEl    = document.getElementById('est-out-meta');
    if (serviceEl) serviceEl.innerHTML = SERVICE_LABEL[est.service] + ' &middot; ' + SIZE_LABEL[est.size];
    if (rangeEl)   rangeEl.textContent = fmt(lo) + ' – ' + fmt(hi);
    if (metaEl) {
      metaEl.textContent = 'Most jobs in this range wrap in ' + time + '. Free written estimate either way.';
    }
  }

  var serviceSel = document.getElementById('est-service');
  if (serviceSel) {
    serviceSel.addEventListener('change', function () {
      est.service = serviceSel.value;
      updateEstimate();
    });
  }
  document.querySelectorAll('[data-size]').forEach(function (b) {
    b.addEventListener('click', function () {
      est.size = b.getAttribute('data-size');
      document.querySelectorAll('[data-size]').forEach(function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
      updateEstimate();
    });
  });
  document.querySelectorAll('[data-materials]').forEach(function (b) {
    b.addEventListener('click', function () {
      est.materials = b.getAttribute('data-materials');
      document.querySelectorAll('[data-materials]').forEach(function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
      updateEstimate();
    });
  });
  updateEstimate();

  /* ---------- ZIP service-area checker ---------- */
  var ZIPS = {
    /* Indianapolis */
    '46201': 'Indianapolis (Near East)', '46202': 'Indianapolis (Downtown)',
    '46203': 'Indianapolis (Southeast)', '46204': 'Indianapolis (Downtown)',
    '46205': 'Indianapolis (Mapleton-Fall Creek)', '46208': 'Indianapolis (Butler-Tarkington)',
    '46214': 'Indianapolis (Ben Davis)', '46217': 'Indianapolis (Southport)',
    '46219': 'Indianapolis (Irvington)', '46220': 'Indianapolis (Broad Ripple)',
    '46221': 'Indianapolis (West)', '46222': 'Indianapolis (Haughville)',
    '46224': 'Speedway / Indianapolis', '46225': 'Indianapolis (Bates-Hendricks)',
    '46226': 'Lawrence / Indianapolis', '46227': 'Indianapolis (Garfield Park)',
    '46228': 'Indianapolis (Crooked Creek)', '46229': 'Indianapolis (Cumberland)',
    '46235': 'Indianapolis (Lawrence)', '46236': 'Indianapolis (Geist)',
    '46237': 'Indianapolis (Southeast)', '46239': 'Indianapolis (Wanamaker)',
    '46240': 'Indianapolis (Nora)', '46241': 'Indianapolis (West)',
    '46250': 'Indianapolis (Castleton)', '46254': 'Indianapolis (Eagle Creek)',
    '46256': 'Indianapolis (Geist)', '46259': 'Indianapolis (Acton)',
    '46260': 'Indianapolis (Meridian Hills)', '46268': 'Indianapolis (Pike)',
    '46278': 'Indianapolis (Traders Point)', '46280': 'Indianapolis (Williams Creek)',
    /* Surrounding cities */
    '46032': 'Carmel', '46033': 'Carmel', '46074': 'Westfield',
    '46037': 'Fishers', '46038': 'Fishers', '46040': 'Fortville',
    '46060': 'Noblesville', '46061': 'Noblesville', '46062': 'Noblesville',
    '46077': 'Zionsville',
    '46112': 'Brownsburg',
    '46168': 'Plainfield',
    '46123': 'Avon',
    '46142': 'Greenwood', '46143': 'Greenwood',
    '46184': 'Whiteland',
    '46131': 'Franklin',
    '46055': 'McCordsville',
    '46140': 'Greenfield',
    '46052': 'Lebanon',
    '46107': 'Beech Grove'
  };
  var zipInput = document.getElementById('zip-input');
  var zipResult = document.getElementById('zip-result');
  if (zipInput && zipResult) {
    zipInput.addEventListener('input', function () {
      var v = zipInput.value.replace(/\D/g, '').slice(0, 5);
      zipInput.value = v;
      zipResult.classList.remove('ok', 'no');
      if (v.length === 0) { zipResult.textContent = 'Enter ZIP…'; return; }
      if (v.length < 5)   { zipResult.textContent = 'Need all 5 digits'; return; }
      if (ZIPS[v]) {
        zipResult.textContent = '✓ Yes — ' + ZIPS[v] + ' is in our area.';
        zipResult.classList.add('ok');
      } else {
        zipResult.textContent = '✗ Outside core area — call us, we may still come.';
        zipResult.classList.add('no');
      }
    });
  }

  /* ---------- Live-ticker rotating recent-jobs ---------- */
  var TICKER_JOBS = [
    'Just finished: Bathroom vanity swap · Castleton · 2 hrs ago',
    'Just finished: Deck stain & seal · Fishers · this morning',
    'Just finished: Ceiling fan install · Broad Ripple · yesterday',
    'Just finished: Kitchen backsplash · Carmel · 2 days ago',
    'Just finished: Grab-bar install · Greenwood · this week',
    'Just finished: Drywall patch · Speedway · this morning',
    'Just finished: Garbage disposal · Zionsville · yesterday'
  ];
  var tickerEl = document.getElementById('live-ticker-text');
  if (tickerEl) {
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % TICKER_JOBS.length;
      tickerEl.style.opacity = '0';
      setTimeout(function () {
        tickerEl.textContent = TICKER_JOBS[idx];
        tickerEl.style.opacity = '1';
      }, 250);
    }, 4500);
    tickerEl.style.transition = 'opacity .25s ease';
  }

  /* ---------- Reveal-on-scroll ---------- */
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Animated stat counters ---------- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    var dur = 1400, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var v = target * easeOutCubic(p);
      var disp = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US');
      el.textContent = disp + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCounter(e.target);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.counter').forEach(function (el) { countObs.observe(el); });
  } else {
    document.querySelectorAll('.counter').forEach(function (el) {
      var t = el.getAttribute('data-target'), d = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var s = el.getAttribute('data-suffix') || '';
      el.textContent = (d > 0 ? parseFloat(t).toFixed(d) : parseInt(t, 10).toLocaleString('en-US')) + s;
    });
  }

  /* ---------- Dark / light theme toggle ---------- */
  (function () {
    var root = document.documentElement;
    var key = 'mhs-theme';
    var stored = null;
    try { stored = localStorage.getItem(key); } catch (e) { /* private mode */ }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');

    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    function sync() {
      var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      btn.setAttribute('aria-pressed', cur === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', cur === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    sync();
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (next === 'dark') root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
      try { localStorage.setItem(key, next); } catch (e) { /* ignore */ }
      sync();
    });
    /* Follow system change if user hasn't manually toggled (no stored pref) */
    if (!stored && window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var mqHandler = function (e) {
        var s; try { s = localStorage.getItem(key); } catch (err) { s = null; }
        if (s) return;
        if (e.matches) root.setAttribute('data-theme', 'dark');
        else root.removeAttribute('data-theme');
        sync();
      };
      if (mq.addEventListener) mq.addEventListener('change', mqHandler);
      else if (mq.addListener) mq.addListener(mqHandler);
    }
  })();

  /* ---------- Before/After image slider ---------- */
  document.querySelectorAll('.gallery-tile.is-slider').forEach(function (tile) {
    var handle = tile.querySelector('.ba-handle');
    var grip   = tile.querySelector('.ba-grip');
    var after  = tile.querySelector('.ba-after');
    if (!handle || !after) return;
    var dragging = false;
    function setPos(clientX) {
      var rect = tile.getBoundingClientRect();
      var ratio = (clientX - rect.left) / rect.width;
      if (ratio < 0) ratio = 0; else if (ratio > 1) ratio = 1;
      var pct = ratio * 100;
      handle.style.left = pct + '%';
      if (grip) grip.style.left = pct + '%';
      after.style.clipPath = 'inset(0 ' + (100 - pct).toFixed(2) + '% 0 0)';
    }
    function down(e) {
      dragging = true;
      var x = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      setPos(x);
      if (e.pointerId !== undefined && tile.setPointerCapture) {
        try { tile.setPointerCapture(e.pointerId); } catch (err) {}
      }
    }
    function move(e) {
      if (!dragging) return;
      var x = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      setPos(x);
      if (e.cancelable) e.preventDefault();
    }
    function up() { dragging = false; }
    tile.addEventListener('pointerdown', down);
    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', up);
    tile.addEventListener('pointercancel', up);
    tile.addEventListener('pointerleave', up);
    /* Touch fallback for older Safari */
    tile.addEventListener('touchstart', down, { passive: true });
    tile.addEventListener('touchmove', move, { passive: false });
    tile.addEventListener('touchend', up);
  });

  /* ---------- Multi-step quote form ---------- */
  (function () {
    var form = document.getElementById('quote-form');
    if (!form) return;
    var steps = form.querySelectorAll('.ms-step');
    var totalSteps = steps.length;
    var barFill = document.getElementById('ms-bar-fill');
    var stepLabel = document.getElementById('ms-step-label');
    var stepCount = document.getElementById('ms-step-count');
    var errorEl = document.getElementById('ms-error');
    var bar = form.querySelector('.ms-bar');
    var stepNames = ['The job', 'Contact info', 'Timing &amp; preferences'];

    function showStep(n) {
      steps.forEach(function (s) {
        var stepNum = parseInt(s.getAttribute('data-step'), 10);
        s.hidden = (stepNum !== n);
      });
      if (barFill) barFill.style.width = ((n / totalSteps) * 100).toFixed(2) + '%';
      if (bar) bar.setAttribute('aria-valuenow', String(Math.round((n / totalSteps) * 100)));
      if (stepLabel) stepLabel.innerHTML = stepNames[n - 1] || '';
      if (stepCount) stepCount.textContent = 'Step ' + n + ' of ' + totalSteps;
      if (errorEl) errorEl.classList.remove('is-shown');
      /* Focus first input in the new step for screen-reader continuity */
      var active = form.querySelector('.ms-step[data-step="' + n + '"]');
      if (active) {
        var firstField = active.querySelector('input, select, textarea');
        if (firstField) setTimeout(function () { firstField.focus({ preventScroll: true }); }, 80);
      }
    }

    function validateStep(n) {
      var active = form.querySelector('.ms-step[data-step="' + n + '"]');
      if (!active) return true;
      var fields = active.querySelectorAll('input[required], select[required], textarea[required]');
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (!f.value || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value))) {
          if (errorEl) {
            errorEl.textContent = 'Quick fix needed — ' + (f.previousElementSibling ? f.previousElementSibling.textContent.toLowerCase() : 'a required field') + ' looks empty.';
            errorEl.classList.add('is-shown');
          }
          f.focus();
          return false;
        }
      }
      return true;
    }

    form.querySelectorAll('.ms-next').forEach(function (b) {
      b.addEventListener('click', function () {
        var current = parseInt(b.closest('.ms-step').getAttribute('data-step'), 10);
        if (!validateStep(current)) return;
        var next = parseInt(b.getAttribute('data-target-step'), 10);
        showStep(next);
      });
    });
    form.querySelectorAll('.ms-prev').forEach(function (b) {
      b.addEventListener('click', function () {
        var target = parseInt(b.getAttribute('data-target-step'), 10);
        showStep(target);
      });
    });

    /* Pre-fill job_type when user came via a service-page CTA (?service=drywall etc.) */
    try {
      var params = new URLSearchParams(window.location.search);
      var hint = params.get('service');
      if (hint) {
        var sel = document.getElementById('f-type');
        if (sel) {
          var map = {
            'drywall': 'Drywall & paint', 'plumbing': 'Plumbing fix', 'electrical': 'Electrical (light work)',
            'decks': 'Deck / outdoor', 'kitchen-bath': 'Kitchen / bath remodel', 'installs': 'TV mount / shelving / small install'
          };
          var label = map[hint];
          if (label) {
            for (var i = 0; i < sel.options.length; i++) {
              if (sel.options[i].text === label || sel.options[i].text.indexOf(label) === 0) {
                sel.selectedIndex = i; break;
              }
            }
          }
        }
      }
    } catch (e) { /* ignore */ }
  })();

  /* ---------- PWA: register service worker ---------- */
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () { /* silent */ });
    });
  }
})();
