// JS base para futuras funcionalidades do site SNT Almada

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('.nav-list');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    function closeMenu() {
        if (navList) navList.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (navToggle && navList && mobileOverlay) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navList.classList.toggle('open');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
        });
        
        mobileOverlay.addEventListener('click', closeMenu);
        
        // Fecha o menu ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navList.classList.contains('open')) {
                closeMenu();
            }
        });
    }
}); 