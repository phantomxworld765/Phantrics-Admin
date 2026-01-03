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
// Is line ko code ke sabse upar (script.js mein) daal dein
document.addEventListener('click', () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}, { once: true });

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
// 1. Notification Awaaz ka intezam
const notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

// 2. Browser permission mangna (Page load hote hi)
if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission();
}

// 3. Nayi Payment aate hi Alert dene ka logic
database.ref('payments').on('child_added', (snapshot) => {
    const newPayment = snapshot.val();
    
    // Sirf tab awaaz kare jab data real-time mein aaye
    notificationSound.play().catch(e => console.log("Sound play error:", e));

    // Desktop/Mobile Notification dikhana
    if (Notification.permission === "granted") {
        new Notification("New Payment Alert! 💰", {
            body: `${newPayment.name || 'User'} ne ₹${newPayment.amount || '0'} ki payment bheji hai.`,
            icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
        });
    }
});

  
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




