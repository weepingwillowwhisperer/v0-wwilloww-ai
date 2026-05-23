/* wwilloww.ai — minimal interactivity */

(function () {
  "use strict";

  // ---------- Year in footer ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Theme toggle (light / dark) ----------
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var userThemeChoice = null;

  function setTheme(theme, persist) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (toggle) {
      var isDark = theme === "dark";
      toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
    if (persist) {
      userThemeChoice = theme;
    }
  }

  // Initial theme: system preference > light. User choice is in-memory only
  // because the preview iframe does not allow browser storage APIs.
  var prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light", false);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next, true);
    });
  }

  // Honor system theme changes if the user hasn't chosen explicitly
  if (window.matchMedia) {
    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      if (userThemeChoice) return; // user has chosen during this page session
      setTheme(e.matches ? "dark" : "light", false);
    };
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else if (mql.addListener) mql.addListener(onChange);
  }

  // ---------- Header scroll state ----------
  var header = document.querySelector(".site-header");
  if (header) {
    var setHeaderState = function () {
      if (window.scrollY > 4) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
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
            source: "wwilloww.ai waitlist form",
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
          "We could not save your signup just now. Please try again, or email hello@wwilloww.ai.",
          true
        );
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Join the waitlist";
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
