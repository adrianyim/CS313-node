const select = require("../js/select");
const express = require("express");

const connectionString = "process.env.DATABASE_URL";
// const connectionString = "postgres://adrianyim:adrianyim@localhost:5432/budgetkeeper_db";

// const {Pool} = require("pg");
// const pool = new Pool({connectionString: connectionString});

const app = express();

app.post("/", (req, res) => {
    console.log("In the home page");
    // Retrieve data from client side
    let username = req.body.username;
    let password = req.body.password;

    console.log("Recived data:\nUsername: " + username + "\nPassword: " + password);

    // let sql = "SELECT password FROM users WHERE user_name = $1";
    // let select_params = [username];

    // pool.query(sql, select_params, (err, result) => {
    //     if (err) {
    //         console.log("Error in query, ", err);
    //         callback(err, null);
    //     }


    // });

    // Check username and password
    if (username == "tester" && password == 1234) {

        req.session.username = username;

        // Direct to home page and pass the session variable
        res.render("home", {
            username: req.session.username
        });
    }
});

module.exports = app ;