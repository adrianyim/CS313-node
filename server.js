require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
// const session = require("express-session");
// const bodyparse = require("body-parse");
const pg = require("pg");
const connectionString = process.env.DATABASE_URL;
// || "postgres://adrianyim:adrianyim@localhost:5432/budgetkeeper_db";

//Use server, public file
app.use(express.static(path.join(__dirname, "public")));

//Set server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", (process.env.PORT || 1010));

//Get server
app.get("/", (req, res) => {
    res.render("pages/BudgetKeeper-home");
});

app.get("/getItems", getItems);
// app.get("/getItems/:id", getItems);

//Listen server
app.listen(app.get("port"), () => {
    console.log("Listening for connections on: ", app.get("port"));
});


// Functions
function getItems(req, res) {
    console.log("In the getItems function");

    let username = req.query.username;
    // let id = req.params.id;
    console.log("The username is : ", username);

    getItemsDB(username, (error, result) => {
        console.log("The result from getItemsDB from the DB is: " , result);

        if (error || result == null || result.length != 1) {
            res.status(500).json({success: false, data: error});
        } else {
            res.json(result);
        }
    });
}

function getItemsDB(username, callback) {
    console.log("In getItemsDB function with username: ", username);

    // let sql = "SELECT i.user_name, i.item_id, i.item, i.item_type, i.remark, (SELECT c.cost FROM cost c WHERE c.cost_id = i.cost_id) AS cost, (SELECT c.cost_type FROM cost c WHERE c.cost_id = i.cost_id) AS cost_type, (SELECT d.date FROM date d WHERE d.date_id = i.date_id) AS date FROM items i WHERE i.user_name = 'admin' ORDER BY date;";

    let client = new pg.Client(connectionString);

    client.connect((err => {
        if (err) {
            console.log("Error with DB!");
            console.log(err);
            callback(err, null);
        }

        let sql = "SELECT * FROM items WHERE user_name=$1";
        let params = [username];

        let query = client.query(sql, params, (err, result) => {
            client.end((err) => {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query, ", err);
                callback(err, null);
            }

            console.log("Result is: " + JSON.stringify(result.rows));
            callback(null, result.rows);
        });
    }))
}