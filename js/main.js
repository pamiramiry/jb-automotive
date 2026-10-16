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

  /* Fade-up on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

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

  /* PREVIEW ONLY: colourway switcher. The choice is saved per browser and can be linked with ?theme=brass, ?theme=oxblood or ?theme=navy (Steel blue is the default) */
  var THEME_COLORS = { brass: "#121417", oxblood: "#15110F", navy: "#0F1A2E", steel: "#0F141A" };
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var themeButtons = document.querySelectorAll("[data-theme-choice]");
  function applyTheme(name) {
    if (!THEME_COLORS[name]) name = "brass";
    if (name === "brass") doc.removeAttribute("data-theme");
    else doc.setAttribute("data-theme", name);
    if (themeMeta) themeMeta.setAttribute("content", THEME_COLORS[name]);
    themeButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-choice") === name)); });
  }
  applyTheme(doc.getAttribute("data-theme") || "brass"); // <html data-theme="steel"> makes Steel blue the default; no attribute means Brass
  themeButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      var name = b.getAttribute("data-theme-choice");
      applyTheme(name);
      try { localStorage.setItem("jb-theme", name); } catch (err) { /* private mode: choice lasts this visit only */ }
    });
  });

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Quote form: no endpoint yet, so validate and confirm inline */
  var form = document.getElementById("quote-form");
  var msg = document.getElementById("form-msg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("has-error"); });
    form.querySelectorAll("[required]").forEach(function (input) {
      if (!input.checkValidity()) {
        var field = input.closest(".field");
        if (field) field.classList.add("has-error");
        input.setAttribute("aria-invalid", "true");
        if (!firstBad) firstBad = input;
      } else {
        input.removeAttribute("aria-invalid");
      }
    });
    if (firstBad) {
      msg.classList.add("is-error");
      msg.textContent = "Please fill in the highlighted fields so we can call you back.";
      firstBad.focus();
      return;
    }
    msg.classList.remove("is-error");
    msg.textContent = "Got it. Thanks. We'll call you back during shop hours (Mon-Fri 8-6). In a hurry? Call (905) 276-2732.";
    form.reset();
  });
})();
