const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "phantrics-paymentsbot.firebaseapp.com",
    databaseURL: "https://phantrics-paymentsbot-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "phantrics-paymentsbot",
    storageBucket: "phantrics-paymentsbot.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// Status Colors
const getStatusStyles = (status) => {
    let s = status ? status.toLowerCase() : 'pending';
    if (s === 'success' || s === 'successful') return { color: '#28a745', icon: '✅' };
    if (s === 'failed') return { color: '#dc3545', icon: '❌' };
    return { color: '#ffc107', icon: '⏳' };
};

// Dashboard par cards dikhana
database.ref('payments').on('value', (snapshot) => {
    const data = snapshot.val();
    const gridContainer = document.querySelector('#payments .grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = ""; 
    if (data) {
        Object.keys(data).forEach(id => {
            const item = data[id];
            const style = getStatusStyles(item.status);
            gridContainer.innerHTML += `
                <div style="border-left: 5px solid ${style.color}; padding: 15px; background: #2a2a40; border-radius: 10px; margin-bottom: 10px; color: white;">
                    <div style="font-size: 24px; float: right;">${style.icon}</div>
                    <h3 style="margin: 0;">₹${item.amount || '0'}</h3>
                    <p style="margin: 5px 0;">Name: ${item.name || 'User'}</p>
                </div>`;
        });
    } else {
        gridContainer.innerHTML = "<p style='color:white;'>No Data Found</p>";
    }
});

// Sound/Alert Logic
database.ref('payments').limitToLast(1).on('child_added', (snapshot) => {
    const newP = snapshot.val();
    setTimeout(() => {
        alert("💰 Nayi Payment: " + newP.name + " (₹" + newP.amount + ")");
    }, 2000);
});

