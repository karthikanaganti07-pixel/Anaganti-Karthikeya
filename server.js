
const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send("Welcome to my Node.js lab");
});

app.get("/about", (request, response) => {
    response.json({
        name: "Karthikeya",
        section: "CSE"
    });
});

app.get("/time", (request, response) => {
    let date = new Date();
    response.send("Today's date and time: " + date);
});

app.use((request, response) => {
    response.status(404).send("404 - Page not found");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
