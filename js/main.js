/**
 * Ehsan Law, PLLC - Main JavaScript
 * Mobile menu, FAQ accordion, and scroll behaviors
 */

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    var mobileToggle = document.querySelector('.header__mobile-toggle');
    var headerNav = document.querySelector('.header__nav');
    var mobileMenu = document.querySelector('.mobile-menu');
    var header = document.querySelector('.header');
    
    // Mobile Menu Toggle
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Check if we have the mobile-menu element (newer pattern)
        if (mobileMenu) {
          var isOpen = mobileMenu.classList.contains('is-open');
          
          if (isOpen) {
            mobileMenu.classList.remove('is-open');
            document.body.classList.remove('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
          } else {
            mobileMenu.classList.add('is-open');
            document.body.classList.add('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'true');
          }
        }
        // Fallback to header__nav pattern (older pattern)
        else if (headerNav) {
          var isOpen = headerNav.classList.contains('is-open');
          
          if (isOpen) {
            headerNav.classList.remove('is-open');
            document.body.classList.remove('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
          } else {
            headerNav.classList.add('is-open');
            document.body.classList.add('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
    
    // Dropdown toggles on mobile
    var dropdownToggles = document.querySelectorAll('.has-dropdown > .nav-link');
    
    dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        // Only handle on mobile
        if (window.innerWidth >= 1024) {
          return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        var parent = this.parentElement;
        var isOpen = parent.classList.contains('is-open');
        
        // Close all other dropdowns first
        document.querySelectorAll('.has-dropdown.is-open').forEach(function(openDropdown) {
          if (openDropdown !== parent) {
            openDropdown.classList.remove('is-open');
          }
        });
        
        // Toggle current dropdown
        if (isOpen) {
          parent.classList.remove('is-open');
        } else {
          parent.classList.add('is-open');
        }
      });
    });
    
    // Close mobile menu when clicking submenu items
    var dropdownItems = document.querySelectorAll('.dropdown-item');
    
    dropdownItems.forEach(function(item) {
      item.addEventListener('click', function() {
        if (window.innerWidth >= 1024) return;
        
        // Close the mobile menu
        if (headerNav) {
          headerNav.classList.remove('is-open');
          document.body.classList.remove('menu-open');
          if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
          }
        }
        
        // Close all dropdowns
        document.querySelectorAll('.has-dropdown.is-open').forEach(function(d) {
          d.classList.remove('is-open');
        });
      });
    });
    
    // Close menu when clicking regular nav links
    var regularNavLinks = document.querySelectorAll('.header__nav-list > li:not(.has-dropdown) > .nav-link');
    
    regularNavLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth >= 1024) return;
        
        if (headerNav) {
          headerNav.classList.remove('is-open');
          document.body.classList.remove('menu-open');
          if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });

    // Header scroll effect
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      });
    }

    // FAQ Accordion
    var faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
      var question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', function() {
          var isOpen = item.classList.contains('is-open');
          
          // Close all other items
          faqItems.forEach(function(otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('is-open');
            }
          });
          
          // Toggle current item
          if (isOpen) {
            item.classList.remove('is-open');
          } else {
            item.classList.add('is-open');
          }
        });
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          var headerHeight = header ? header.offsetHeight : 0;
          var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Form validation
    var forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        var requiredFields = form.querySelectorAll('[required]');
        var isValid = true;
        
        requiredFields.forEach(function(field) {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
        
        if (isValid) {
          e.preventDefault();
          alert('Thank you for your message! We will get back to you within one business day.');
          form.reset();
        }
      });
      
      // Remove error state on input
      var inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(function(field) {
        field.addEventListener('input', function() {
          this.classList.remove('is-invalid');
        });
      });
    });

    // Language switcher
    var langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lang = this.dataset.lang;
        
        langButtons.forEach(function(b) {
          b.classList.remove('lang-btn--active');
        });
        this.classList.add('lang-btn--active');
        
        console.log('Language switched to:', lang);
      });
    });

    // Phone click tracking
    var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        console.log('Phone call initiated:', this.href);
      });
    });

    // ============================================
    // COUNTER ANIMATION
    // Numbers count up when scrolled into view
    // ============================================
    
    function animateCounter(element) {
      var target = parseInt(element.dataset.count, 10);
      var suffix = element.dataset.suffix || '';
      var duration = 2000; // 2 seconds
      var start = 0;
      var startTime = null;
      
      function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
      }
      
      function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var easedProgress = easeOutQuart(progress);
        var currentValue = Math.floor(easedProgress * target);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target + suffix;
        }
      }
      
      requestAnimationFrame(updateCounter);
    }
    
    // Intersection Observer for counter animation
    var counterElements = document.querySelectorAll('[data-count]');
    var countersAnimated = false;
    
    if (counterElements.length > 0 && 'IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counterElements.forEach(function(counter) {
              animateCounter(counter);
            });
            counterObserver.disconnect();
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      });
      
      // Observe the stats grid
      var statsGrid = document.querySelector('.stats-grid');
      if (statsGrid) {
        counterObserver.observe(statsGrid);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      counterElements.forEach(function(counter) {
        var target = counter.dataset.count;
        var suffix = counter.dataset.suffix || '';
        counter.textContent = target + suffix;
      });
    }

  });
})();
