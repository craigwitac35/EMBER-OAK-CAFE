/* ============================================================
   EMBER & OAK CAFE — scripts.js
   Purpose:    Global site interactivity
   Depends on: styles.css for all visual state classes
   Pages:      All pages (loaded at root level — scripts.js)

   Sections:
     1. STICKY HEADER SCROLL STATE
     2. MOBILE NAVIGATION TOGGLE
     3. BACK TO TOP BUTTON
     4. MENU CATEGORY FILTER
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';


  /* ----------------------------------------------------------
    SECTION 1: STICKY HEADER SCROLL STATE
    What it does:
      - Watches the scroll position on every page
      - Adds .scrolled to #site-header when user scrolls past 50px
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

    // Keep watching on every scroll event
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

    /* C) Escape key — close the menu if open */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navToggle.focus(); // Return focus to toggle for keyboard users
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

    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  }


  /* ----------------------------------------------------------
    SECTION 4: MENU CATEGORY FILTER
    What it does:
      - Only runs on pages that have .filter-btn elements
        (currently menu.html only — safe to load on all pages)
      - Clicking a filter button shows only the matching
        .menu-category[data-category] section
      - "All Items" (data-filter="all") shows everything
      - .menu-divider elements between categories are hidden
        automatically when only one category is visible —
        prevents orphaned dividers from appearing mid-page
      - Active button gets .active class for CSS orange underline

    How the data attributes connect:
      HTML button:  <button data-filter="espresso">
      HTML section: <div data-category="espresso">
      These values must match exactly for the filter to work.

    Fade animation:
      Categories fade out then back in on filter change.
      Uses CSS opacity transition on .menu-category.
      The class .menu-hidden sets opacity:0 + display:none.
  ---------------------------------------------------------- */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const menuCategories = document.querySelectorAll('.menu-category[data-category]');
  const menuDividers   = document.querySelectorAll('.menu-divider');

  if (filterBtns.length && menuCategories.length) {

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {

        // ── Update active button state ──
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // ── Show / hide categories ──
        menuCategories.forEach(category => {
          if (filter === 'all' || category.getAttribute('data-category') === filter) {
            category.style.display = '';
          } else {
            category.style.display = 'none';
          }
        });

        // ── Show / hide dividers ──
        // Only show dividers when ALL categories are visible (filter = all)
        // Hide them when a single category is filtered — no orphaned lines
        menuDividers.forEach(divider => {
          divider.style.display = filter === 'all' ? '' : 'none';
        });

      });
    });

  }


});
/* ============================================================
   END OF SCRIPTS
============================================================ */
