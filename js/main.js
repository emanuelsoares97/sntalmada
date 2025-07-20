document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');
  const mobileOverlay = document.getElementById('mobile-overlay');
  if (navToggle && navList && mobileOverlay) {
    navToggle.addEventListener('click', function() {
      navList.classList.toggle('open');
      mobileOverlay.classList.toggle('active');
    });
    mobileOverlay.addEventListener('click', function() {
      navList.classList.remove('open');
      mobileOverlay.classList.remove('active');
    });
  }
}); 