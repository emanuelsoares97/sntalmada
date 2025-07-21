// JS base para futuras funcionalidades do site SNT Almada

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('.nav-list');
    const mobileOverlay = document.getElementById('mobile-overlay');
    if (navToggle && navList && mobileOverlay) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('open');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
        });
        mobileOverlay.addEventListener('click', function() {
            navList.classList.remove('open');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        // Fecha o menu ao clicar em qualquer link do menu (sem impedir navegação)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('open');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navList.classList.contains('open')) {
                navList.classList.remove('open');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}); 