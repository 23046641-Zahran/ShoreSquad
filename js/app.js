// Main App JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initMobileMenu();
    initMap();
    loadWeather();
    loadCommunityUpdates();
    initializeAccessibility();
});

// Mobile menu functionality
function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });
    }
}

// Map initialization function using Google Maps Embed API
async function initMap() {
    const mapContainer = document.getElementById('cleanup-map');
    if (!mapContainer) return;

    try {
        const config = await import('./config.js');
        const apiKey = config.default.googleMapsApiKey;
        
        const nextCleanupLocation = {
            lat: 1.381497,
            lng: 103.955574,
            title: 'Pasir Ris Beach Cleanup'
        };

        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '450';
        iframe.style.border = '0';
        iframe.loading = 'lazy';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
          const mapUrl = new URL('https://www.google.com/maps/embed/v1/place');
        mapUrl.searchParams.append('key', apiKey);
        mapUrl.searchParams.append('q', 'Pasir Ris Beach');  // Using place name instead of coordinates
        mapUrl.searchParams.append('zoom', '15');
        mapUrl.searchParams.append('center', `${nextCleanupLocation.lat},${nextCleanupLocation.lng}`);
        
        iframe.src = mapUrl.toString();
        mapContainer.innerHTML = '';
        mapContainer.appendChild(iframe);
    } catch (error) {
        console.error('Error initializing map:', error);
        mapContainer.innerHTML = `
            <div class="error-message" role="alert">
                <p>Unable to load map. Please try again later.</p>
            </div>
        `;
    }
}

// Weather data loading function
async function loadWeather() {
    const weatherContainer = document.querySelector('.weather-container');
    if (!weatherContainer) return;

    try {
        // TODO: Implement weather API integration
        // For now, show placeholder weather data
        weatherContainer.innerHTML = `
            <div class="weather-card" role="article">
                <h3>Today's Beach Weather</h3>
                <div class="weather-info">
                    <p><span aria-label="Temperature">🌡️ 75°F</span></p>
                    <p><span aria-label="Wave height">🌊 2-3 ft</span></p>
                    <p><span aria-label="Wind speed">💨 8 mph</span></p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading weather:', error);
        weatherContainer.innerHTML = `
            <div class="error-message" role="alert">
                <p>Unable to load weather data. Please try again later.</p>
            </div>
        `;
    }
}

// Community updates loading function
async function loadCommunityUpdates() {
    const communityGrid = document.querySelector('.community-grid');
    if (!communityGrid) return;

    try {
        // TODO: Implement community updates from a backend
        // For now, show placeholder updates
        const updates = [
            {
                title: 'Weekend Cleanup Success!',
                content: 'Over 50 volunteers helped clean North Beach last weekend!',
                date: '2025-06-03'
            },
            {
                title: 'Upcoming Event',
                content: 'Join us this Saturday for our monthly beach cleanup.',
                date: '2025-06-07'
            }
        ];

        communityGrid.innerHTML = updates.map(update => `
            <article class="update-card">
                <h3>${update.title}</h3>
                <p>${update.content}</p>
                <time datetime="${update.date}">Event Date: ${update.date}</time>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error loading community updates:', error);
        communityGrid.innerHTML = `
            <div class="error-message" role="alert">
                <p>Unable to load community updates. Please try again later.</p>
            </div>
        `;
    }
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Set focus to the target element
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Ensure proper focus management for modal dialogs (to be implemented)
    // Handle keyboard navigation for custom components (to be implemented)
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
