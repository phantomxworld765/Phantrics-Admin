// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUGdB4H-KnOAxXGfVBE95-kP6UeP6aXqw",
  authDomain: "phantrics-paymentsbot.firebaseapp.com",
  projectId: "phantrics-paymentsbot",
  storageBucket: "phantrics-paymentsbot.firebasestorage.app",
  messagingSenderId: "699181120500",
  appId: "1:699181120500:web:4c79588d550705a360d7a1",
  measurementId: "G-WW507H6N36"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// Status ke hisab se styling function
const getStatusStyles = (status) => {
    let s = status ? status.toLowerCase() : 'pending';
    if (s === 'success' || s === 'successful') return { color: '#28a745', icon: '✅' };
    if (s === 'failed') return { color: '#dc3545', icon: '❌' };
    return { color: '#ffc107', icon: '⏳' }; // Pending
};

// Real-time Database Listener
database.ref('payments').on('value', (snapshot) => {
    const data = snapshot.val();
    const gridContainer = document.querySelector('#payments .grid'); 
    
    if (gridContainer) {
        gridContainer.innerHTML = ""; // Purana data clear karein
        
        if (data) {
            Object.keys(data).forEach(id => {
                const item = data[id];
                const style = getStatusStyles(item.status);

                gridContainer.innerHTML += `
                    <div class="card" style="border-left: 5px solid ${style.color};">
                        <div class="card-icon">${style.icon}</div>
                        <h3>₹${item.amount || '0'}</h3>
                        <p><strong>Name:</strong> ${item.name || 'Unknown'}</p>
                        <span class="status-badge" style="background: ${style.color}; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">
                            ${item.status || 'pending'}
                        </span>
                    </div>
                `;
            });
        } else {
            gridContainer.innerHTML = "<p style='color:white; text-align:center;'>No data found in Database</p>";
        }
    }
});


