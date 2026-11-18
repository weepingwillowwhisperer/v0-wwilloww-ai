/* Willow Academy (willowpdf.com): minimal interactivity */

(function () {
  "use strict";

  // ---------- Year in footer ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Reading theme (Daylight / Dusk / Mist) ----------
  // The inline script in <head> sets the first theme before paint. This block
  // wires the switch, remembers the choice on this device, and follows the
  // system's dark setting until the reader chooses.
  var root = document.documentElement;
  var THEMES = ["daylight", "dusk", "mist"];
  var THEME_KEY = "academy-theme";
  var themeButtons = document.querySelectorAll("[data-theme-choice]");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var userChoseTheme = false;

  function readSavedTheme() {
    try {
      var saved = window.localStorage.getItem(THEME_KEY);
      return THEMES.indexOf(saved) > -1 ? saved : null;
    } catch (e) {
      return null; // storage can be unavailable (private mode, embedded previews)
    }
  }

  function setTheme(theme) {
    if (THEMES.indexOf(theme) === -1) theme = "daylight";
    root.setAttribute("data-theme", theme);
    themeButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-theme-choice") === theme ? "true" : "false"
      );
    });
    if (themeMeta && window.getComputedStyle) {
      var ground = window
        .getComputedStyle(root)
        .getPropertyValue("--ground")
        .trim();
      if (ground) themeMeta.setAttribute("content", ground);
    }
  }

  var systemDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  var savedTheme = readSavedTheme();
  if (savedTheme) userChoseTheme = true;
  setTheme(savedTheme || (systemDark && systemDark.matches ? "dusk" : "daylight"));

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var choice = button.getAttribute("data-theme-choice");
      userChoseTheme = true;
      setTheme(choice);
      try {
        window.localStorage.setItem(THEME_KEY, choice);
      } catch (e) {
        /* the choice still holds for this visit */
      }
    });
  });

  if (systemDark) {
    var onSystemChange = function (e) {
      if (userChoseTheme) return;
      setTheme(e.matches ? "dusk" : "daylight");
    };
    if (systemDark.addEventListener)
      systemDark.addEventListener("change", onSystemChange);
    else if (systemDark.addListener) systemDark.addListener(onSystemChange);
  }

  // ---------- FAQ: open one at a time, but allow all closed ----------
  var faqs = document.querySelectorAll(".faq-item");
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqs.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // ---------- Waitlist form ----------
  var form = document.getElementById("waitlistForm");
  var status = document.getElementById("formStatus");

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", !!isError);
  }

  var PORT_API_BASE = "__PORT_8000__";
  var isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  var API_BASE = PORT_API_BASE.indexOf("__PORT_") === 0
    ? isLocalHost
      ? "http://localhost:8000"
      : ""
    : PORT_API_BASE;

  function getCheckedValues(name) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (input) {
        return input.value;
      });
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      setStatus("");

      var emailField = form.querySelector('input[name="email"]');
      var submit = form.querySelector('button[type="submit"]');
      var value = (emailField && emailField.value ? emailField.value : "").trim();

      // Basic email validity check (HTML5 + RFC-ish fallback)
      var looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!value) {
        setStatus("Please add your email so we can let you know.", true);
        if (emailField) emailField.focus();
        return;
      }
      if (!looksLikeEmail) {
        setStatus("That doesn't look like a complete email address.", true);
        if (emailField) emailField.focus();
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = "Joining...";
      }

      try {
        var response = await fetch(API_BASE + "/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: value,
            stage: getCheckedValues("stage"),
            product_interest: "whole library",
            source: "willowpdf.com updates form",
            consent: "yes",
            notes: "",
          }),
        });
        var data = await response.json();
        if (!response.ok || data.ok === false) {
          throw new Error(data.message || "We could not save your signup.");
        }
        setStatus(data.message);
        form.reset();
      } catch (error) {
        setStatus(
          "We could not save your signup just now. Please try again, or email weepingwillowwhisperer@gmail.com.",
          true
        );
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Get updates";
        }
      }
    });
  }

  // ---------- Smooth focus on in-page nav ----------
  // Move focus to the target so screen-reader users land in the section.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      // let smooth scroll happen, then move focus without re-scrolling
      window.setTimeout(function () {
        var prev = target.getAttribute("tabindex");
        if (prev === null) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (prev === null) {
          // clean up so we don't leave stray tabindexes on sections
          target.addEventListener(
            "blur",
            function once() {
              target.removeAttribute("tabindex");
              target.removeEventListener("blur", once);
            }
          );
        }
      }, 300);
    });
  });
})();
