// public/js/main.js

document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display menu items based on the selected category
    const category = new URLSearchParams(window.location.search).get('category');
    if (category) {
        fetchMenuItems(category);
    }
});

// Function to fetch menu items
function fetchMenuItems(category) {
    fetch(`/api/menu?category=${category}`)
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-items');
            menuContainer.innerHTML = ''; // Clear existing content
            data.forEach(item => {
                const menuItem = `
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p>${item.available ? 'Available' : 'Unavailable'}</p>
                            </div>
                        </div>
                    </div>`;
                menuContainer.innerHTML += menuItem;
            });
        })
        .catch(error => console.error('Error fetching menu items:', error));
}

// Admin Functionality - Handling Item Management (Add, Update, Delete)
if (window.location.pathname.includes('/admin/dashboard.html')) {
    document.getElementById('add-item-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const itemData = {
            name: formData.get('name'),
            category: formData.get('category'),
            available: formData.get('available') === 'on'
        };

        fetch('/admin/add-item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Item added successfully');
            this.reset(); // Clear form fields
        })
        .catch(error => console.error('Error adding item:', error));
    });
}
