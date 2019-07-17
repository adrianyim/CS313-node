require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
// const session = require("express-session");
const bodyparser = require("body-parser");
const pg = require("pg");
const connectionString = "postgres://adrianyim:adrianyim@localhost:5432/budgetkeeper_db";
//process.env.DATABASE_URL || 

//Use server, public file
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({ extended: false }));

//Set server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", (process.env.PORT || 1010));

//Get server
app.get("/", (req, res) => {
    res.render("pages/BudgetKeeper-home");
});

// Select
app.get("/selectItems", selectItems);
// app.get("/selectItems/:id", selectItems);

// Insert
app.post("/insertItems", insertItems);

// Update
// app.put("/updateItems", updateItems);

// Delete
// app.delete("/deleteItems", deleteItems);

//Listen server
app.listen(app.get("port"), () => {
    console.log("Listening for connections on: ", app.get("port"));
});

// Calling server functions
// Select funtion
function selectItems(req, res) {
    console.log("In the selectItems function");

    selectDB((error, result) => {
        console.log("The result from selectItems from the DB is: " , result);

        if (error || result == null || result.length == 0) {
            console.log("Why got error?", error, result, result.length);
            res.status(500).json({success: false, data: error});
        } else {
            res.json(result);
        }
    });
}

// SELECT query funtion
function selectDB(callback) {
    console.log("In selectDB function");

    let client = new pg.Client(connectionString);

    client.connect((err) => {
        if (err) {
            console.log("Error with DB!");
            console.log(err);
            callback(err, null);
        }

        let sql = "SELECT i.user_name, i.item_id, i.item, i.item_type, i.remark, (SELECT c.cost FROM cost c WHERE c.cost_id = i.cost_id) AS cost, (SELECT c.cost_type FROM cost c WHERE c.cost_id = i.cost_id) AS cost_type, (SELECT d.date FROM date d WHERE d.date_id = i.date_id) AS date FROM items i ORDER BY date";
        // let params = [username];

        client.query(sql, (err, result) => {
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
    });
}

//Insert funtion
function insertItems(req, res) {
    console.log("In insertItems function");

    // Retrieve data from client side
    let item = req.body.item;
    let item_type = req.body.item_type;
    let cost = req.body.cost;
    let cost_type = req.body.cost_type;
    let remark = req.body.remark;

    console.log("The retrieve data are: ");
    console.log("Item: ", item);
    console.log("Item_type: ", item_type);
    console.log("Cost: ", cost);
    console.log("Cost_type: ", cost_type);
    console.log("Remark: ", remark);

    insertDB(item, item_type, cost, cost_type, remark, (error, result) => {
        console.log("The result from insertItems from the DB is: " , result);

        if (error || result == null) {
            console.log("Why got error?", error, result);
            res.status(500).json({success: false, data: error});
        } else {
            res.send(result);
        }
        
    });
}

// INSERT query function
function insertDB(item, item_type, cost, cost_type, remark, callback) {
    console.log("In insertDB function");

    // Create client object
    let client = new pg.Client(connectionString);

    // Connect to DB
    client.connect((err) => {
        if (err) {
            console.log("Error with connecting to DB: ", err);
            callback(err, null);
        }

        console.log("DB corrected!");

        let combinedResult;

        // SQL queries
        let sql_items = "INSERT INTO items (item_id, item, item_type, remark, cost_id, date_id, user_name) VALUES (DEFAULT, $1, $2, $3, DEFAULT, DEFAULT, 'tester')";

        let sql_cost = "INSERT INTO cost (cost_id, cost, cost_type) VALUES (DEFAULT, $1, $2)";
        
        let sql_date = "INSERT INTO date (date_id, date) VALUES (DEFAULT, current_timestamp)";

        let cost_params = [cost, cost_type];

        let items_params = [item, item_type, remark];

        // Inserting into cost table
        client.query(sql_cost, cost_params, (err, result) => {
            console.log("Inerting into COST");
            console.log(cost_params);

            if (err) {
                console.log("ERROR: Problem with insert query into cost table: ", err);
                callback(err, null);
            }

            // Query result
            console.log(result);
            combinedResult += result; 

            // Inserting into date table
            client.query(sql_date, (err, result) => {
                console.log("Inerting into DATE");
                
                if (err) {
                    console.log("ERROR: Problem with insert query into date table: ", err);
                    callback(err, null);
                }

                // Query result
                console.log(result);
                combinedResult += result; 

                // Inserting into items table
                client.query(sql_items, items_params, (err, result) => {
                    console.log("Inerting into ITEMS");
                    console.log(items_params);

                    if (err) {
                        console.log("ERROR: Problem with insert query into items table: ", err);
                        callback(err, null);
                    }

                    // Query result
                    console.log(result);
                    combinedResult += result; 

                    callback(null, combinedResult);

                    // End the query
                    client.end((err) => {
                        if (err) {
                            console.log("Error with ending the query: ", err);
                            throw err;
                        }
                    });
                });
            });
        });
    });
}