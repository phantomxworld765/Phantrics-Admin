// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUGdB4H-KmOAxXGfVBE95-kP6UeP6aXqw",
  authDomain: "phantrics-paymentsbot.firebaseapp.com",
  projectId: "phantrics-paymentsbot",
  storageBucket: "phantrics-paymentsbot.firebasestorage.app",
  messagingSenderId: "699181120500",
  appId: "1:699181120500:web:4c79588d550705a360d7a1",
  measurementId: "G-WWS07H6N36"
};

// Initialize Firebase
// Firebase ko initialize karne ka sahi tarika compatibility mode mein
firebase.initializeApp(firebaseConfig);
const database = firebase.database(); // Ab aap database use kar sakte hain
// Database se data lene ka asli logic
database.ref('payments').on('value', (snapshot) => {
    const data = snapshot.val();
    const gridContainer = document.querySelector('.grid'); // Check karein aapka main div yahi hai
    
    if (data) {
        gridContainer.innerHTML = ""; // Purana static data saaf karein
        Object.keys(data).forEach(id => {
            const item = data[id];
            gridContainer.innerHTML += `
                <div class="card">
                    <div class="card-icon">💰</div>
                    <h3>₹${item.amount}</h3>
                    <p>${item.name}</p>
                    <span class="status-badge">${item.status}</span>
                </div>
            `;
        });
    }
});

database.ref('payments').on('value', (snapshot) => {
    const data = snapshot.val();
    console.log("Live Data Received:", data);
    if(data) {
        // Agar data milta hai toh dashboard refresh hoga
        // Yahan aap apna updateUI() function call kar sakte hain
    }
});


// Dashboard functionality for Phantrics Admin
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Dashboard cards configuration
    const dashboardCards = [
        { id: 'dashboard', icon: '📊', title: 'Dashboard', url: 'dashboard.html' },
        { id: 'jobs', icon: '💼', title: 'Available Jobs', url: 'jobs.html' },
        { id: 'add-person', icon: '👤+', title: 'Add Person', url: 'add-person.html' },
        { id: 'staff', icon: '👥', title: 'Staff', url: 'staff.html' },
        { id: 'clients', icon: '🏢', title: 'Clients', url: 'clients.html' },
        { id: 'employees', icon: '👔', title: 'Employees', url: 'employees.html' },
        { id: 'transactions', icon: '🔄', title: 'Transactions', url: 'transactions.html' },
        { id: 'gallery', icon: '🖼️', title: 'Gallery', url: 'gallery.html' },
        { id: 'payments', icon: '💳', title: 'Payments', url: 'payments.html' },
        { id: 'documents', icon: '📄', title: 'Documents', url: 'documents.html' },
        { id: 'messages', icon: '💬', title: 'Messages', url: 'messages.html' }
    ];

    // Create dashboard grid
    createDashboardGrid(dashboardCards);

    // Setup event listeners
    setupEventListeners();

    // Initialize tooltips and animations
    initializeAnimations();
}

function createDashboardGrid(cards) {
    const grid = document.querySelector('.dashboard-grid');
    if (!grid) return;

    grid.innerHTML = '';

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'dashboard-card';
        cardElement.setAttribute('data-card-id', card.id);
        cardElement.style.animationDelay = `${index * 0.1}s`;

        cardElement.innerHTML = `
            <div class="card-content">
                <div class="card-icon">${card.icon}</div>
                <div class="card-title">${card.title}</div>
            </div>
        `;

        cardElement.addEventListener('click', () => handleCardClick(card));
        grid.appendChild(cardElement);
    });
}

function handleCardClick(card) {
    // Show loading state
    showLoading();

    // Add click animation
    const clickedCard = document.querySelector(`[data-card-id="${card.id}"]`);
    clickedCard.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        clickedCard.style.transform = '';
        
        // Navigate to respective page
        if (card.url) {
            // Option 1: Navigate to another page
            // window.location.href = card.url;
            
            // Option 2: Show alert (for demo purposes)
            showNotification(`Opening ${card.title}...`);
            
            // Option 3: Call specific function based on card
            switch(card.id) {
                case 'dashboard':
                    openDashboard();
                    break;
                case 'jobs':
                    openJobs();
                    break;
                case 'add-person':
                    openAddPerson();
                    break;
                case 'staff':
                    openStaff();
                    break;
                case 'clients':
                    openClients();
                    break;
                case 'employees':
                    openEmployees();
                    break;
                case 'transactions':
                    openTransactions();
                    break;
                case 'gallery':
                    openGallery();
                    break;
                case 'payments':
                    openPayments();
                    break;
                case 'documents':
                    openDocuments();
                    break;
                case 'messages':
                    openMessages();
                    break;
            }
        }
        
        hideLoading();
    }, 300);
}

// Individual page functions
function openDashboard() {
    console.log('Opening Dashboard...');
    // Add your dashboard logic here
}

function openJobs() {
    console.log('Opening Available Jobs...');
    // Add your jobs logic here
}

function openAddPerson() {
    console.log('Opening Add Person form...');
    // Add your add person logic here
}

function openStaff() {
    console.log('Opening Staff management...');
    // Add your staff logic here
}

function openClients() {
    console.log('Opening Clients list...');
    // Add your clients logic here
}

function openEmployees() {
    console.log('Opening Employees list...');
    // Add your employees logic here
}

function openTransactions() {
    console.log('Opening Transactions...');
    // Add your transactions logic here
    function openPayments() {
    console.log('Fetching live payments...');
    
    // Firebase se payments uthane ka logic
    database.ref('payments').on('value', (snapshot) => {
        const payments = snapshot.val();
        const grid = document.querySelector('.grid'); // Aapka display area
        grid.innerHTML = ""; // Purana data saaf karne ke liye

        if (payments) {
            Object.keys(payments).forEach(id => {
                const p = payments[id];
                // Ek sunder card banayein har payment ke liye
                grid.innerHTML += `
                    <div class="card">
                        <h3>${p.name}</h3>
                        <p>Amount: ₹${p.amount}</p>
                        <p>UTR: ${p.utr}</p>
                        <button onclick="approve('${id}')">Approve</button>
                    </div>`;
            });
        } else {
            grid.innerHTML = "<p>No pending payments.</p>";
        }
    });
}
function approve(id) {
    database.ref('payments/' + id).update({
        status: 'Success'
    }).then(() => {
        alert("Payment Approved!");
        // Yahan se aap Telegram notification bhi bhej sakte hain
    });
}

}

function openGallery() {
    console.log('Opening Gallery...');
    // Add your gallery logic here
}

function openPayments() {
    console.log('Opening Payments...');
    // Add your payments logic here
}

function openDocuments() {
    console.log('Opening Documents...');
    // Add your documents logic here
}

function openMessages() {
    console.log('Opening Messages...');
    // Add your messages logic here
}

// Event Listeners Setup
function setupEventListeners() {
    // Back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Settings icon
    const settingsIcon = document.querySelector('.settings-icon');
    if (settingsIcon) {
        settingsIcon.addEventListener('click', () => {
            showNotification('Opening Settings...');
            // Add settings page navigation or modal
        });
    }

    // Admin badge click
    const adminBadge = document.querySelector('.admin-badge');
    if (adminBadge) {
        adminBadge.addEventListener('click', () => {
            showNotification('Admin Profile');
            // Add admin profile functionality
        });
    }
}

// Animation initialization
function initializeAnimations() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Utility Functions
function showLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('active');
    }
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.remove('active');
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        color: #667eea;
        padding: 15px 30px;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);



