/* ============================================================
   EMBER & OAK CAFE — scripts.js
   Purpose:    Global site interactivity
   Depends on: styles.css for all visual state classes
   Pages:      All pages (loaded at root level — scripts.js)

   Sections:
     1. STICKY HEADER SCROLL STATE
     2. MOBILE NAVIGATION TOGGLE
     3. BACK TO TOP BUTTON
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';


  /* ----------------------------------------------------------
    SECTION 1: STICKY HEADER SCROLL STATE
    What it does:
      - Watches the scroll position on every page
      - Adds .scrolled to .site-header when user scrolls past 50px
      - Removes .scrolled when user scrolls back to the top
      - .scrolled triggers: solid background, reduced padding,
        dark text/icons replacing white (all handled in CSS)

    Why handleScroll() runs immediately on load:
      - Without this, if a page loads mid-scroll (e.g. browser
        back button, anchor link, page refresh) the header stays
        transparent until the user physically moves the page.
      - Calling it once on DOMContentLoaded catches that state.
  ---------------------------------------------------------- */
  const header = document.getElementById('site-header');

  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    // Run once immediately to catch mid-scroll page loads
    handleScroll();

    // Then keep watching on every scroll event
    window.addEventListener('scroll', handleScroll, { passive: true });
  }


  /* ----------------------------------------------------------
    SECTION 2: MOBILE NAVIGATION TOGGLE
    What it does:
      - Toggles the mobile nav menu open and closed
      - Updates aria-expanded on the button for accessibility
      - Adds/removes .active on .nav-links to trigger CSS animation
        (max-height + opacity transition — NOT display:none toggle)
      - Scroll lock intentionally removed: the menu is a floating
        card so the page should remain scrollable behind it

    Three ways to close the menu:
      A) Click the hamburger button again
      B) Click any link inside the open menu
      C) Press the Escape key
  ---------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {

    /* A) Hamburger button click — toggle open/close */
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('active');
    });

    /* B) Click any nav link — close the menu */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });

    /* C) Escape key — close the menu if it's open */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        // Return focus to the toggle button for keyboard users
        navToggle.focus();
      }
    });

  }


  /* ----------------------------------------------------------
    SECTION 3: BACK TO TOP BUTTON
    What it does:
      - Shows a floating circular button after 300px of scroll
      - Hides it again when near the top
      - Smooth scrolls to top when clicked
      - Visibility is CSS-driven via .visible class
        (opacity + visibility transition — not display toggle)
  ---------------------------------------------------------- */
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {

    /* Show/hide based on scroll depth */
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    /* Smooth scroll to top on click */
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  }


});
/* ============================================================
   END OF SCRIPTS
============================================================ */
