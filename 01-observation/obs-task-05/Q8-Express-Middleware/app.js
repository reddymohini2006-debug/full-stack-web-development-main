const express = require("express");

const app = express();

const PORT = 3000;


// Middleware

app.use(function (req, res, next) {
    console.log(
        "Request received:",
        req.method,
        req.url
    );

    next();
});


// Home Route

app.get("/", function (req, res) {
    res.send("Welcome to Express Middleware");
});


// Students Route

app.get("/students", function (req, res) {
    res.json([
        {
            id: 1,
            name: "Rahul",
            course: "BCA"
        },
        {
            id: 2,
            name: "Priya",
            course: "B.Sc"
        }
    ]);
});


// About Route

app.get("/about", function (req, res) {
    res.send("Middleware processes the request before sending the response.");
});


// Start Server

app.listen(PORT, function () {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});