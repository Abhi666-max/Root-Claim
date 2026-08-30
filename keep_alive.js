const https = require('https');

function ping() {
    https.get('https://root-claim.onrender.com/health', (res) => {
        console.log(`Pinged at ${new Date().toLocaleTimeString()} - Status: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Ping failed: ${e.message}`);
    });
}

// Ping every 4 minutes (240000 ms) to be safe before the 15-minute sleep
setInterval(ping, 240000);
ping(); // initial ping
console.log("Keep-alive script running... Leave this terminal open during the hackathon to keep the backend awake!");
