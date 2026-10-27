/* JB Automotive. Small, dependency-free behaviour. Loaded with defer. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  /* Header: compact once the page scrolls (hysteresis stops it flickering at the threshold) */
  var header = document.querySelector(".site-header");
  var compact = false;
  function onScroll() {
    var y = window.scrollY;
    if (!compact && y > 120) { compact = true; header.classList.add("is-compact"); }
    else if (compact && y < 40) { compact = false; header.classList.remove("is-compact"); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });

  /* Odometer numbers: each digit rolls up like a car odometer when the stats scroll into view.
     The plain value stays in .sr-only for screen readers; without JS the static number shows. */
  var odos = [];
  document.querySelectorAll("[data-odometer]").forEach(function (num) {
    var value = num.getAttribute("data-odometer");
    var face = num.querySelector(".odo");
    if (!face) return;
    face.textContent = "";
    var strips = [];
    value.split("").forEach(function (ch) {
      if (/\d/.test(ch)) {
        var col = document.createElement("span");
        col.className = "odo-col";
        var strip = document.createElement("span");
        strip.className = "odo-strip";
        for (var d = 0; d <= 9; d++) {
          var cell = document.createElement("span");
          cell.textContent = String(d);
          strip.appendChild(cell);
        }
        strip.setAttribute("data-digit", ch);
        col.appendChild(strip);
        face.appendChild(col);
        strips.push(strip);
      } else {
        var sym = document.createElement("span");
        sym.className = "odo-sym";
        sym.textContent = ch;
        face.appendChild(sym);
      }
    });
    odos.push(strips);
  });
  function rollOdometers() {
    odos.forEach(function (strips) {
      strips.forEach(function (strip, i) {
        // Rightmost wheel moves first, like a real odometer
        strip.style.transitionDelay = ((strips.length - 1 - i) * 120) + "ms";
        strip.style.transform = "translateY(" + (-1.15 * Number(strip.getAttribute("data-digit"))) + "em)";
      });
    });
  }
  var numbers = document.getElementById("numbers");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (odos.length && numbers) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      rollOdometers();
    } else {
      var odoIo = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { rollOdometers(); odoIo.disconnect(); }
      }, { threshold: 0.35 });
      odoIo.observe(numbers);
    }
  }

  /* Review row: arrow buttons step one card at a time and disable at the ends */
  var rail = document.getElementById("review-rail");
  if (rail) {
    var prev = document.querySelector("[data-rail-prev]");
    var next = document.querySelector("[data-rail-next]");
    var step = function () {
      var card = rail.querySelector("figure");
      return card ? card.getBoundingClientRect().width + 16 : rail.clientWidth;
    };
    var updateRail = function () {
      prev.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    };
    prev.addEventListener("click", function () { rail.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { rail.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    rail.addEventListener("scroll", updateRail, { passive: true });
    window.addEventListener("resize", updateRail);
    updateRail();
  }

  /* Today's hours, using shop time (Mississauga) */
  var day;
  try {
    var name = new Intl.DateTimeFormat("en-CA", { weekday: "short", timeZone: "America/Toronto" }).format(new Date());
    day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name.replace(".", ""));
  } catch (err) { day = -1; }
  if (day < 0) day = new Date().getDay();
  var row = document.querySelector('#hours li[data-day="' + day + '"]');
  if (row) row.classList.add("is-today");
  if (day === 0 || day === 6) {
    var status = document.getElementById("today-status");
    status.textContent = "Closed today · Open Monday at 8";
    status.hidden = false;
  }

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Quote form: no endpoint yet. Each field shows its own error under it (checked on blur,
     then live once touched); submit focuses the first problem and confirms inline on success. */
  var form = document.getElementById("quote-form");
  var msg = document.getElementById("form-msg");
  function controlsOf(field) { return field.querySelectorAll("input, textarea, select"); }
  function fieldValid(field) {
    var controls = controlsOf(field);
    for (var i = 0; i < controls.length; i++) { if (!controls[i].checkValidity()) return false; }
    return true;
  }
  function showField(field) {
    var ok = fieldValid(field);
    var err = field.querySelector(".field-error");
    field.classList.toggle("has-error", !ok);
    if (err) err.hidden = ok;
    controlsOf(field).forEach(function (c) { if (ok) c.removeAttribute("aria-invalid"); else c.setAttribute("aria-invalid", "true"); });
    return ok;
  }
  var fields = form.querySelectorAll(".field");
  fields.forEach(function (field) {
    var touched = false;
    controlsOf(field).forEach(function (c) {
      c.addEventListener("blur", function () {
        // only judge a field once the visitor has typed or chosen something, or tried to submit
        if (c.value || c.type === "radio") { touched = true; showField(field); }
      });
      c.addEventListener("input", function () { if (touched || field.classList.contains("has-error")) showField(field); });
      c.addEventListener("change", function () { if (touched || field.classList.contains("has-error")) showField(field); });
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = [];
    fields.forEach(function (field) { if (!showField(field)) bad.push(field); });
    if (bad.length) {
      msg.classList.add("is-error");
      msg.textContent = bad.length === 1 ? "One field needs fixing before we can call you back." : bad.length + " fields need fixing before we can call you back.";
      controlsOf(bad[0])[0].focus();
      return;
    }
    msg.classList.remove("is-error");
    msg.textContent = "Got it. Thanks. We'll call you back during shop hours (Mon-Fri 8-6). In a hurry? Call (905) 276-2732.";
    form.reset();
  });
})();
