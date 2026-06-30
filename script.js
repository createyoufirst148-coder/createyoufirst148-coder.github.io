(function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  const experienceTabs = document.querySelectorAll('.experience-tab');
  const experiencePanels = document.querySelectorAll('.experience-panel');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('data-section') === current;
      link.classList.toggle('active', isActive);
    });
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileNav.hidden = true;
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileToggle.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileNav.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  mobileToggle.addEventListener('click', function () {
    if (mobileNav.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  experienceTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const index = parseInt(tab.getAttribute('data-index'), 10);

      experienceTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      experiencePanels.forEach(function (panel) {
        panel.classList.remove('active');
        panel.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');

      const panel = experiencePanels[index];
      panel.classList.add('active');
      panel.hidden = false;
    });

    tab.addEventListener('keydown', function (e) {
      const tabsArray = Array.from(experienceTabs);
      const currentIndex = tabsArray.indexOf(tab);
      let nextIndex = currentIndex;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabsArray.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabsArray.length) % tabsArray.length;
      } else {
        return;
      }

      tabsArray[nextIndex].click();
      tabsArray[nextIndex].focus();
    });
  });

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
})();
