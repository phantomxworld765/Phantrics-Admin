// 1. Firebase Configuration (Aapka purana config yahan rahega)
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "phantrics...",
    databaseURL: "https://phantrics...",
    projectId: "phantrics...",
    storageBucket: "phantrics...",
    messagingSenderId: "...",
    appId: "..."
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// Awaaz ka intezam
const notificationSound = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');

// Status Styling Function
const getStatusStyles = (status) => {
    let s = status ? status.toLowerCase() : 'pending';
    if (s === 'success' || s === 'successful') return { color: '#28a745', icon: '✅' };
    if (s === 'failed') return { color: '#dc3545', icon: '❌' };
    return { color: '#ffc107', icon: '⏳' };
};

// REAL-TIME LISTENER (Cards dikhane aur Alert dene ke liye)
database.ref('payments').on('value', (snapshot) => {
    const data = snapshot.val();
    const gridContainer = document.querySelector('#payments .grid');

    if (gridContainer) {
        gridContainer.innerHTML = ""; // Purana data saaf karein

        if (data) {
            Object.keys(data).forEach(id => {
                const item = data[id];
                const style = getStatusStyles(item.status);

                gridContainer.innerHTML += `
                    <div class="card" style="border-left: 5px solid ${style.color}; padding: 15px; background: #2a2a40; border-radius: 10px; margin-bottom: 10px;">
                        <div style="font-size: 24px; float: right;">${style.icon}</div>
                        <h3 style="color: white; margin: 0;">₹${item.amount || '0'}</h3>
                        <p style="color: #bbb; margin: 5px 0;"><strong>Name:</strong> ${item.name || 'Unknown'}</p>
                        <span style="background: ${style.color}; color: white; padding: 2px 8px; border-radius: 5px; font-size: 12px;">
                            ${item.status || 'pending'}
                        </span>
                    </div>`;
            });
        } else {
            gridContainer.innerHTML = "<p style='color:white; text-align:center;'>No payments yet.</p>";
        }
    }
});

// NAYI PAYMENT KA ALERT (Ise separate rakhte hain)
database.ref('payments').limitToLast(1).on('child_added', (snapshot) => {
    // Page load hone ke 3 second baad hi alert bajega (taaki purane data par na baje)
    setTimeout(() => {
        const newP = snapshot.val();
        notificationSound.play().catch(e => console.log("Sound blocked"));
        alert("💰 NAYI PAYMENT AAI HAI!\n\nNaam: " + newP.name + "\nAmount: ₹" + newP.amount);
    }, 3000);
});

