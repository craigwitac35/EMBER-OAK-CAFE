/* =========================================================================
   EMBER & OAK CAFE — Main JavaScript
   Purpose: Global interactivity (Menu, Header Scroll, Back to Top)
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HEADER SCROLL STATE ──
     Changes header background from transparent to solid when scrolling down.
  */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ── 2. MOBILE NAVIGATION ──
     Handles the hamburger toggle, link clicks, and escape key closure.
     (Scroll lock removed so user can scroll while menu floats)
  */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    // Toggle menu open/close
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close menu when any link inside it is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when the Escape key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      }
    });
  }

  /* ── 3. BACK TO TOP BUTTON ──
     Shows/hides the floating action button based on scroll depth.
  */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    // Scroll smoothly to the top when clicked
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
