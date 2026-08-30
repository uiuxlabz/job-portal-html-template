/* ============================================================
   JOBENTRY — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Constants
     --------------------------------------------------------- */
  const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Header — scroll effect
     --------------------------------------------------------- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------
     Burger toggle (mobile nav)
     --------------------------------------------------------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('open');
        burger.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on overlay click
    mobileNav.addEventListener('click', function (e) {
      if (e.target === mobileNav) {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------------------------------------------------------
     Active nav link based on current page
     --------------------------------------------------------- */
  (function () {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-link, .mobile-nav .nav-link');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  })();

  /* ---------------------------------------------------------
     [data-year] — auto-fill current year
     --------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------------------------------------------------
     IntersectionObserver — reveal animations
     --------------------------------------------------------- */
  if (!PREFERS_REDUCED) {
    var revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children';

    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      document.querySelectorAll(revealSelectors).forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback: show everything
      document.querySelectorAll(revealSelectors).forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  } else {
    // Reduced motion: make all reveal elements visible immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ---------------------------------------------------------
     Counter animation for stat numbers
     --------------------------------------------------------- */
  if (!PREFERS_REDUCED && 'IntersectionObserver' in window) {
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      var counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach(function (el) {
        counterObserver.observe(el);
      });
    }

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var duration = 1500;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(step);
    }
  }

  /* ---------------------------------------------------------
     [data-form] — simple form validation + submit
     --------------------------------------------------------- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var okEl = form.querySelector('.form-ok');
      var errEl = form.querySelector('.form-err');
      if (okEl) okEl.style.display = 'none';
      if (errEl) errEl.style.display = 'none';

      // Check required fields
      var required = form.querySelectorAll('[required]');
      var valid = true;

      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#DC2626';
        } else {
          field.style.borderColor = '';
        }
      });

      // Email validation
      var emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          valid = false;
          emailField.style.borderColor = '#DC2626';
        }
      }

      if (!valid) {
        if (errEl) errEl.style.display = 'block';
        return;
      }

      // Simulate submission
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();
          if (okEl) okEl.style.display = 'block';

          // Auto-hide success after 5s
          setTimeout(function () {
            if (okEl) okEl.style.display = 'none';
          }, 5000);
        }, 1200);
      } else {
        form.reset();
        if (okEl) okEl.style.display = 'block';
        setTimeout(function () {
          if (okEl) okEl.style.display = 'none';
        }, 5000);
      }
    });
  });

  /* ---------------------------------------------------------
     Filter tabs (jobs page)
     --------------------------------------------------------- */
  var filterTabs = document.querySelectorAll('.filter-tab');
  var jobCards = document.querySelectorAll('.job-card[data-category]');

  if (filterTabs.length && jobCards.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var filter = tab.getAttribute('data-filter');

        // Update active tab
        filterTabs.forEach(function (t) {
          t.classList.remove('active');
        });
        tab.classList.add('active');

        // Filter cards
        jobCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            // Re-trigger reveal if not already shown
            if (!PREFERS_REDUCED) {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(function () {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 50);
            }
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Back to Top button
     --------------------------------------------------------- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: PREFERS_REDUCED ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     Smooth scroll for anchor links
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: PREFERS_REDUCED ? 'auto' : 'smooth',
        });
      }
    });
  });

})();
