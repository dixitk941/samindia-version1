(function() {
    "use strict";
  
    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');
  
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  
    /**
     * Animation on scroll function and init
     */
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', aosInit);
  
    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    /**
     * Initiate Pure Counter
     */
    new PureCounter();
  
    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
  
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  
    window.addEventListener("load", initSwiper);
  
    const toggleButton = document.getElementById("dark-mode-toggle");
    const toggleIcon = document.getElementById("dark-mode-icon");
  
    function updateIcon() {
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        toggleIcon.classList.remove("bi-moon");
        toggleIcon.classList.add("bi-sun");
      } else {
        toggleIcon.classList.remove("bi-sun");
        toggleIcon.classList.add("bi-moon");
      }
    }
  
    toggleButton.addEventListener("click", function() {
      document.body.classList.add('color-transition');
      setTimeout(() => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        updateIcon();
  
        // Save the user's preference to local storage
        localStorage.setItem("theme", newTheme);
  
        setTimeout(() => {
          document.body.classList.remove('color-transition');
        }, 1000);
      }, 500); // This should be shorter than the transition time to start the switch effect first
    });
  
    // On page load, check if dark mode was previously enabled
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      updateIcon();
    }
  
  })();
  