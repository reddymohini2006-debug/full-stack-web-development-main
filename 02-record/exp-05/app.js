const express = require('express'); 
// Create Express application 
const app = express(); 
// Define port 
const PORT = 3000; 
// Home route 
app.get('/', (req, res) => { 
    res.send('Hello! Welcome to my Express server.'); 
}); 
// Start server 
app.listen(PORT, () => { 
    console.log(`Server is running at http://localhost:${PORT}`); 
}); 