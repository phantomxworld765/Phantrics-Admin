const firebaseConfig = {
    apiKey: "AIzaSyAUgdB4H-KmOAxXGfVBE95-kP6UeP6aXqm",
    authDomain: "phantrics-paymentsbot.firebaseapp.com",
    databaseURL: "https://phantrics-paymentsbot-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "phantrics-paymentsbot",
    storageBucket: "phantrics-paymentsbot.appspot.com",
    messagingSenderId: "699181120500",
    appId: "1:699181120500:web:4c79588d550705a360d7a1"
};

window.onload = function() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();
// Payment notification listener - add after your Firebase config
const paymentsRef = firebase.database().ref('payments');

paymentsRef.on('child_added', (snapshot) => {
  const payment = snapshot.val();
  displayPaymentAlert(payment);
});

paymentsRef.on('child_changed', (snapshot) => {
  const payment = snapshot.val();
  displayPaymentAlert(payment);
});

function displayPaymentAlert(payment) {
  let alertColor, alertIcon, alertText;
  
  switch(payment.status) {
    case 'successful':
      alertColor = '#28a745';
      alertIcon = '✓';
      alertText = `Payment Successful - ${payment.name} (₹${payment.amount})`;
      break;
    case 'failed':
      alertColor = '#dc3545';
      alertIcon = '✗';
      alertText = `Payment Failed - ${payment.name}`;
      break;
    case 'pending':
      alertColor = '#ffc107';
      alertIcon = '⏳';
      alertText = `Payment Pending - ${payment.name}`;
      break;
  }
  
  // Create alert box
  const alert = document.createElement('div');
  alert.innerHTML = `${alertIcon} ${alertText}`;
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${alertColor};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    font-size: 16px;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(alert);
  
  // Remove after 5 seconds
  setTimeout(() => alert.remove(), 5000);
}
    // DASHBOARD CARDS (Line 29 Fix)
    database.ref('payments').on('value', (snapshot) => {
        const data = snapshot.val();
        // Aapke HTML mein 'payments' ID ke andar jo 'grid' hai ye use dhoondhega
        const gridContainer = document.querySelector('#payments .grid');
        
        if (gridContainer) {
            gridContainer.innerHTML = ""; 
            if (data) {
                Object.keys(data).forEach(id => {
                    const item = data[id];
                    gridContainer.innerHTML += `
                        <div style="background:#2a2a40; color:white; padding:15px; margin-bottom:10px; border-radius:10px; border-left: 5px solid #28a745; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                            <h3 style="margin:0; color:#28a745;">₹${item.amount || '0'}</h3>
                            <p style="margin:5px 0; font-weight:bold;">Name: ${item.name || 'User'}</p>
                            <span style="font-size:12px; opacity:0.7;">Status: ${item.status || 'Success'}</span>
                        </div>`;
                });
            } else {
                gridContainer.innerHTML = "<p style='color:white; padding:20px;'>No Payments Found</p>";
            }
        }
    });

    // ALERT NOTIFICATION
    database.ref('payments').limitToLast(1).on('child_added', (snapshot) => {
        const newP = snapshot.val();
        // Page load hone ke 3 second baad active hoga
        setTimeout(() => {
            alert("💰 Nayi Payment Aai Hai!\nNaam: " + (newP.name || "User") + "\nAmount: ₹" + (newP.amount || "0"));
        }, 3000);
    });
};


