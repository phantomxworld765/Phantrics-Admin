const firebaseConfig = {
    apiKey: "AIzaSyAUGdB4H-KmOAxXGfVBE95-kP6UeP6aXqw",
    authDomain: "phantrics-paymentsbot.firebaseapp.com",
    databaseURL: "https://phantrics-paymentsbot-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "phantrics-paymentsbot",
    storageBucket: "phantrics-paymentsbot.appspot.com",
    messagingSenderId: "699181120500",
    appId: "1:699181120500:web:4c79588d550705a360d7a1"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const database = firebase.database();

// Cards dikhane ka logic
database.ref('payments').on('value', (snapshot) => {
    const data = snapshot.val();
    const gridContainer = document.querySelector('.grid'); // Check if your HTML has this class
    if (gridContainer) {
        gridContainer.innerHTML = "";
        if (data) {
            Object.keys(data).forEach(id => {
                const item = data[id];
                gridContainer.innerHTML += `<div class="card" style="background:#2a2a40; color:white; padding:15px; margin-bottom:10px; border-radius:10px;">
                    <h3>₹${item.amount}</h3><p>Name: ${item.name}</p></div>`;
            });
        }
    }
});

// Alert box (Ye bina permission ke bhi dikhega)
database.ref('payments').limitToLast(1).on('child_added', (snapshot) => {
    const newP = snapshot.val();
    setTimeout(() => { alert("💰 Nayi Payment: " + newP.name); }, 2000);
});

