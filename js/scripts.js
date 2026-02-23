/*
=========================================================================
   EMBER & OAK CAFE — scripts.js
   Features: Sticky Header, Mobile Nav, Menu Filtering, Back to Top
   Frameworks: None (Vanilla JS)
=========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ── 1. STICKY HEADER ─────────────────────────────────────────────── */
  const header = document.getElementById('site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run once on load to catch mid-page refreshes, then listen on scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });


  /* ── 2. MOBILE NAVIGATION ─────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle active class for CSS transitions
      navLinks.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link inside it
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }


  /* ── 3. MENU FILTERING (menu.html) ────────────────────────────────── */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCategories = document.querySelectorAll('.menu-category');

  if (filterButtons.length > 0 && menuCategories.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        menuCategories.forEach(category => {
          if (filterValue === 'all') {
            category.style.display = 'block';
          } else {
            if (category.id === filterValue) {
              category.style.display = 'block';
            } else {
              category.style.display = 'none';
            }
          }
        });
      });
    });
  }


  /* ── 4. BACK TO TOP BUTTON ────────────────────────────────────────── */
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    const toggleBackToTop = () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
