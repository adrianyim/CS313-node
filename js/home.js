const select = require("../js/select");
const express = require("express");

const app = express();

app.post("/", (req, res) => {
    console.log("In the home page");
    // Retrieve data from client side
    let username = req.body.username;
    let password = req.body.password;

    console.log(
    "Recived data:\nUsername: " + username + "\nPassword: " + password
    );

    // Check username and password
    if (username == "tester" && password == 1234) {
        console.log("The data is :\n", select.selectItems);

        req.session.username = username;
        req.session.db = select.selectItems;

        // Direct to home page and pass the session variable
        res.render("home", {
            username: req.session.username,
            db: req.session.db
        });
    }
});

module.exports = app ;