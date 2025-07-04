// Import the express module
const express = require('express');
const path = require('path');

// Create an express app
const app = express();

// Set the port number, use environment variable if provided
const PORT = process.env.PORT || 3000;

// Variable to store all received payloads with timestamps
let payloads = [];

// Variable to store the current response code for POST requests
let responseCode = 200;

function pruneOldPayloads() {
    const now = Date.now();
    payloads = payloads.filter(item => now - item.timestamp < 60000);
}

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to handle POST requests
app.post('/', (req, res) => {
    let rawData = '';
    req.on('data', chunk => {
        rawData += chunk; // Accumulate the raw string data
    });
    req.on('end', () => {
        pruneOldPayloads();
        payloads.push({ data: rawData, timestamp: Date.now() }); // Store with timestamp
        res.sendStatus(responseCode); // Use the configurable response code
    });
});

// Route to toggle the response code between 200 and 500
app.post('/toggle-response-code', (req, res) => {
    responseCode = responseCode === 200 ? 500 : 200;
    res.json({ responseCode });
});

// Route to get current server configuration
app.get('/get-config', (req, res) => {
    res.json({
        responseCode
    });
});

// Route to handle DELETE requests to clear the payload list
app.delete('/clear', (req, res) => {
    payloads = []; // Clear the payload list
    res.sendStatus(200); // Send a simple status response
});

// Route to handle GET requests for JSON payloads
app.get('/payloads', (req, res) => {
    pruneOldPayloads();
    res.json(payloads); // Send the payloads as JSON
});

app.get('/client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/client.js')); // Serve the client script
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
