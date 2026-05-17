(function () {
  'use strict';

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

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
})();
