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

  /* Odometer numbers: each wheel already shows its digit, then spins two full turns at one shared speed and
     settles back on it (about 1s), wheels a beat apart from right to left. Each window is sized to its own
     digit, so nothing changes width. The plain value stays in .sr-only; without JS the static number shows. */
  var ODO_TURNS = 2;
  var ODO_MS = 1000;   // spin time, the same for every wheel
  var ODO_STAGGER = 45; // ms between wheels
  var odos = [];
  document.querySelectorAll("[data-odometer]").forEach(function (num) {
    var value = num.getAttribute("data-odometer");
    var face = num.querySelector(".odo");
    if (!face) return;
    face.textContent = "";
    var strips = [];
    var digitsLeft = value.replace(/\D/g, "").length;
    value.split("").forEach(function (ch) {
      if (/\d/.test(ch)) {
        digitsLeft--;
        var turns = ODO_TURNS;
        var col = document.createElement("span");
        col.className = "odo-col";
        var strip = document.createElement("span");
        strip.className = "odo-strip";
        for (var d = 0; d < (turns + 1) * 10; d++) {
          var cell = document.createElement("span");
          cell.textContent = String(d % 10);
          strip.appendChild(cell);
        }
        strip.setAttribute("data-digit", ch);
        strip.setAttribute("data-steps", String(turns * 10 + Number(ch)));
        strip.setAttribute("data-order", String(digitsLeft));
        strip.style.transitionDuration = "0s";
        strip.style.transform = "translateY(" + (-1.15 * Number(ch)) + "em)";
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
  // each window is as wide as its own digit, so the number keeps its natural spacing and never shifts
  function sizeOdometers() {
    odos.forEach(function (strips) {
      strips.forEach(function (strip) {
        var col = strip.parentNode;
        var probe = document.createElement("span");
        probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap";
        probe.textContent = strip.getAttribute("data-digit");
        col.parentNode.appendChild(probe);
        var em = probe.getBoundingClientRect().width / parseFloat(getComputedStyle(col).fontSize);
        col.parentNode.removeChild(probe);
        if (em > 0) col.style.width = em.toFixed(3) + "em";
      });
    });
  }
  sizeOdometers();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeOdometers);
  function rollOdometers() {
    odos.forEach(function (strips, n) {
      strips.forEach(function (strip) {
        var steps = Number(strip.getAttribute("data-steps"));
        strip.setAttribute("data-rolled", "");
        // force the start position before the transition is switched on
        void strip.offsetHeight;
        strip.style.transitionDuration = ODO_MS + "ms";
        strip.style.transitionDelay = (n * 70 + Number(strip.getAttribute("data-order")) * ODO_STAGGER) + "ms";
        strip.style.transform = "translateY(" + (-1.15 * steps) + "em)";
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

  /* Hero video: desktop only, after the opening has played. Never loads on phones, with reduced
     motion, or when the visitor has asked to save data. Pauses off screen; a visible button pauses it. */
  var heroPhoto = document.querySelector(".hero-photo");
  var heroVideo = heroPhoto && heroPhoto.querySelector(".hero-video");
  var toggleBtn = heroPhoto && heroPhoto.querySelector(".video-toggle");
  var saveData = navigator.connection && navigator.connection.saveData;
  if (heroVideo && !reduceMotion && !saveData && window.matchMedia("(min-width: 1024px)").matches) {
    var userPaused = false;
    var setPaused = function (paused) {
      toggleBtn.setAttribute("aria-pressed", String(paused));
      toggleBtn.querySelector("span").textContent = paused ? "Play video" : "Pause video";
    };
    heroVideo.addEventListener("playing", function () { heroPhoto.classList.add("is-playing"); toggleBtn.hidden = false; }, { once: true });
    toggleBtn.addEventListener("click", function () {
      userPaused = !heroVideo.paused;
      if (userPaused) heroVideo.pause(); else heroVideo.play();
      setPaused(userPaused);
    });
    setTimeout(function () {
      heroVideo.src = heroVideo.getAttribute("data-src");
      var p = heroVideo.play();
      if (p && p.catch) p.catch(function () { /* autoplay refused: the still photo stays */ });
    }, 2400);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (!heroVideo.src) return;
        if (entries[0].isIntersecting) { if (!userPaused) heroVideo.play().catch(function () {}); }
        else heroVideo.pause();
      }, { threshold: 0.1 }).observe(heroPhoto);
    }
  }

  /* Call bar stays hidden while the hero and its own buttons are on screen */
  var callBar = document.querySelector(".mobile-bar");
  var heroStage = document.querySelector(".hero-stage");
  if (callBar && heroStage && "IntersectionObserver" in window) {
    callBar.classList.add("is-hidden");
    new IntersectionObserver(function (entries) {
      callBar.classList.toggle("is-hidden", entries[0].isIntersecting);
    }).observe(heroStage);
  }

  /* Hero trust row: open or closed right now, in shop time. Hours: Mon-Fri 8am to 6pm, closed weekends. */
  var openStatus = document.getElementById("open-status");
  if (openStatus && window.Intl) {
    try {
      var parts = {};
      new Intl.DateTimeFormat("en-CA", { weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23", timeZone: "America/Toronto" })
        .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
      var wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday.slice(0, 3));
      var mins = Number(parts.hour) * 60 + Number(parts.minute);
      var weekday = wd >= 1 && wd <= 5;
      var item = openStatus.parentNode;
      if (weekday && mins >= 480 && mins < 1080) {
        openStatus.innerHTML = "<strong>Open now</strong> · until 6pm";
        item.classList.add("is-open");
      } else {
        // closed: lead with the next opening, then the way to book
        var nextOpen = weekday && mins < 480 ? "today" : (wd >= 1 && wd <= 4) || wd === 0 ? "tomorrow" : "Monday";
        openStatus.innerHTML = "<strong>Opens 8am " + nextOpen + "</strong> · <a href=\"tel:+19052762732\">Call to book</a>";
        item.classList.add("is-closed");
      }
    } catch (e) { /* keep the static hours */ }
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
