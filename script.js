const firebaseConfig = {
    apiKey: "AIzaSyAUgdB4H-KmOAxXGfVBE95-kP6UeP6aXqm",
    authDomain: "phantrics-paymentsbot.firebaseapp.com",
    databaseURL: "https://phantrics-paymentsbot-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "phantrics-paymentsbot",
    storageBucket: "phantrics-paymentsbot.appspot.com",
    messagingSenderId: "699181120500",
    appId: "1:699181120500:web:4c79588d550705a360d7a1"
};

// Pura code window load ke baad chalega
window.onload = function() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();

    // 1. Dashboard Cards Logic
    database.ref('payments').on('value', (snapshot) => {
        const data = snapshot.val();
        // Aapke HTML ke hisab se selector
        const gridContainer = document.querySelector('#payments .grid') || document.querySelector('.grid');
        
        if (gridContainer) {
            gridContainer.innerHTML = ""; 
            if (data) {
                Object.keys(data).forEach(id => {
                    const item = data[id];
                    gridContainer.innerHTML += `
                        <div style="background:#2a2a40; color:white; padding:15px; margin-bottom:10px; border-radius:10px; border-left: 5px solid #28a745;">
                            <h3 style="margin:0;">₹${item.amount || '0'}</h3>
                            <p style="margin:5px 0;">Name: ${item.name || 'User'}</p>
                        </div>`;
                });
            } else {
                gridContainer.innerHTML = "<p style='color:white; padding:20px;'>No Payments Found</p>";
            }
        }
    });

    // 2. Alert Logic
    database.ref('payments').limitToLast(1).on('child_added', (snapshot) => {
        const newP = snapshot.val();
        // 3 second delay taaki page load hone par purana alert na aaye
        setTimeout(() => {
            alert("💰 Nayi Payment: " + (newP.name || "User") + " (₹" + (newP.amount || "0") + ")");
        }, 3000);
    });
};

