// Main App JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    initMap();
    // Load weather data
    loadWeather();
    // Load community updates
    loadCommunityUpdates();
});

// Map initialization function
async function initMap() {
    const mapContainer = document.getElementById('cleanup-map');
    // TODO: Implement map integration using a service like Google Maps or Leaflet
    // For now, show a placeholder
    mapContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; background: #e0e0e0;">
            <p>Map loading... (Implementation pending)</p>
        </div>
    `;
}

// Weather data loading function
async function loadWeather() {
    const weatherContainer = document.querySelector('.weather-container');
    // TODO: Implement weather API integration
    // For now, show placeholder weather data
    weatherContainer.innerHTML = `
        <div class="weather-card">
            <h3>Today's Beach Weather</h3>
            <div class="weather-info">
                <p>🌡️ Temperature: 75°F</p>
                <p>🌊 Wave Height: 2-3 ft</p>
                <p>💨 Wind: 8 mph</p>
            </div>
        </div>
    `;
}

// Community updates loading function
async function loadCommunityUpdates() {
    const communityGrid = document.querySelector('.community-grid');
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
        <div class="update-card">
            <h3>${update.title}</h3>
            <p>${update.content}</p>
            <small>Event Date: ${update.date}</small>
        </div>
    `).join('');
}

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
        }
    });
});
