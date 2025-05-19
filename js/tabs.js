document.addEventListener('DOMContentLoaded', function() {
    // Load the default tab (pre-merger)
    loadTabContent('pre-merger');
    
    // Add event listeners to all tab buttons
    document.querySelectorAll('.tab-link').forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.tab-link').forEach(function(t) {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Load the tab content
            const tabName = this.getAttribute('data-tab');
            loadTabContent(tabName);
        });
    });
    
    // Function to load tab content
    function loadTabContent(tabName) {
        const contentContainer = document.getElementById('tab-content-container');
        
        // Fetch the tab content
        fetch(`tabs/${tabName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                contentContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading tab content:', error);
                contentContainer.innerHTML = `<div class="card"><h2>Error loading content</h2><p>Could not load the ${tabName} tab content.</p></div>`;
            });
    }
});