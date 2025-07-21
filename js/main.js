// JS base para futuras funcionalidades do site SNT Almada

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to fetch and inject HTML content
    const loadHTML = async (url, elementId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.statusText}`);
            }
            const text = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = text;
            } else {
                console.error(`Element with id ${elementId} not found.`);
            }
        } catch (error) {
            console.error(`Error loading HTML from ${url}:`, error);
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<p style="color:red; text-align:center;">Failed to load component.</p>`;
            }
        }
    };

    // Load header and footer, then initialize scripts that depend on them
    const initializeLayout = async () => {
        await Promise.all([
            loadHTML('header.html', 'header-placeholder'),
            loadHTML('footer.html', 'footer-placeholder')
        ]);

        // Now that the header is loaded, we can safely attach event listeners
        const navToggle = document.getElementById('nav-toggle');
        const navList = document.querySelector('.nav-list');

        if (navToggle && navList) {
            navToggle.addEventListener('click', () => {
                navList.classList.toggle('open');
            });

            // Close menu when a link is clicked on mobile
            navList.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navList.classList.contains('open') && window.innerWidth <= 700) {
                        navList.classList.remove('open');
                    }
                });
            });
        }
    };

    initializeLayout();
}); 