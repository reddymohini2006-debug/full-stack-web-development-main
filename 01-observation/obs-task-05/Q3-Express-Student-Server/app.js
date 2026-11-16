const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", function (req, res) {
    res.send("Welcome to the Student Server");
});

// Students route
app.get("/students", function (req, res) {

    const students = [
        {
            id: 1,
            name: "Rahul",
            course: "BCA"
        },
        {
            id: 2,
            name: "Priya",
            course: "B.Sc"
        },
        {
            id: 3,
            name: "Arjun",
            course: "B.Tech"
        },
        {
            id: 4,
            name: "Sneha",
            course: "BCA"
        },
        {
            id: 5,
            name: "Kiran",
            course: "B.Com"
        }
    ];

    res.json(students);
});

// About route
app.get("/about", function (req, res) {
    res.send(
        "This is a basic Express.js Student Server application."
    );
});

// Start server
app.listen(PORT, function () {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});