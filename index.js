const express = require('express');
const app = express();

let config;
try {
    config = require('./config');
} catch (e) {
    console.warn("[WARNING] config.js not found. Running with default settings.");
    config = { 
        port: 3000, 
        apiKey: "default_dev_key" 
    };
}

app.get('/', (req, res) => {
    res.send('Secure Backend API v1.0 is running.');
});

app.get('/api/status', (req, res) => {
    if (config.apiKey === "default_dev_key") {
        res.json({ status: "Development Mode", secure: false });
    } else {
        res.json({ status: "Production Mode", secure: true });
    }
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
