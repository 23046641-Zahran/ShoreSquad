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
        // Add loading state
        weatherContainer.innerHTML = '<div class="loading">Loading weather data...</div>';
        
        // Fetch 4-day forecast from data.gov.sg API
        const response = await fetch('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
        const data = await response.json();
        
        if (!data.items || !data.items[0] || !data.items[0].forecasts) {
            throw new Error('Invalid weather data format');
        }

        const forecasts = data.items[0].forecasts;
        
        // Create weather cards for each day
        weatherContainer.innerHTML = `
            <div class="weather-forecast-grid">
                ${forecasts.map((forecast, index) => {
                    const date = new Date(forecast.date);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                    
                    return `
                        <div class="weather-card" role="article">
                            <h3>${index === 0 ? 'Today' : dayName}</h3>
                            <p class="date">${formattedDate}</p>
                            <div class="weather-info">
                                <p class="forecast-detail">
                                    <span class="weather-icon" aria-hidden="true">
                                        ${getWeatherIcon(forecast.forecast)}
                                    </span>
                                    <span class="forecast-text">${forecast.forecast}</span>
                                </p>
                                <p class="temperature">
                                    <span aria-label="Temperature range">🌡️ ${forecast.temperature.low}-${forecast.temperature.high}°C</span>
                                </p>
                                <p class="wind">
                                    <span aria-label="Wind speed and direction">💨 ${forecast.wind.speed.low}-${forecast.wind.speed.high} km/h</span>
                                </p>
                                <p class="humidity">
                                    <span aria-label="Relative humidity range">💧 ${forecast.relative_humidity.low}-${forecast.relative_humidity.high}%</span>
                                </p>
                            </div>
                        </div>
                    `;
                }).join('')}
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

// Helper function to get weather icons
function getWeatherIcon(forecast) {
    const iconMap = {
        'Sunny': '☀️',
        'Partly Cloudy': '⛅',
        'Cloudy': '☁️',
        'Light Rain': '🌦️',
        'Moderate Rain': '🌧️',
        'Heavy Rain': '⛈️',
        'Light Showers': '🌦️',
        'Showers': '🌧️',
        'Heavy Showers': '⛈️',
        'Thundery Showers': '⛈️'
    };
    return iconMap[forecast] || '🌤️';
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
