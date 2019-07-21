const {Pool} = require("pg");

const connectionString = process.env.DATABASE_URL;
// "postgres://adrianyim:adrianyim@localhost:5432/budgetkeeper_db";
//process.env.DATABASE_URL || 

// const client = new pg.Client(connectionString);
const pool = new Pool({connectionString: connectionString});

// Delete function
function deleteItems (req, res) {
    console.log("In deleteItems function");

    let item_id = req.params.id;

    console.log("Item_id: ", item_id);
    
    // deleteDB(item_id, (error, result) => {
    //     console.log("The result from deleteItems from the DB is: " , result);

    //     if (error || result == null) {
    //         console.log("Why got error?", error, result);
    //         res.status(500).json({success: false, data: error});
    //     } else {
    //         // Back to Home page
    //         res.render("home", {
    //             id: req.session.id
    //         });
    //     }
    // });


    selectDB(item_id, (error, result) => {
    console.log("The result from deleteItems from the DB is: " , result);

    if (error || result == null) {
        console.log("Why got error?", error, result);
        res.status(500).json({success: false, data: error});
    } else {
        res.json(result);
    }
});
}

// DELETE query function
function deleteDB (item_id, callback) {
    console.log("In deleteDB function");

    // Connect to DB
    // client.connect((err) => {
    //     if (err) {
    //         console.log("Error with connecting to DB: ", err);
    //         callback(err, null);
    //     }

    //     console.log("DB corrected!");

        let combinedResult;

        // SQL queries
        let sql_items = "DELETE FROM items WHERE item_id = $1";

        let sql_cost = "DELETE FROM cost WHERE cost_id = $1";
        
        let sql_date = "DELETE FROM date WHERE date_id = $1";

        let items_params = [item_id];

        // Deleting cost table
        pool.query(sql_cost, items_params, (err, result) => {
            console.log("Deleting COST");

            if (err) {
                console.log("ERROR: Problem with deleting query on cost table: ", err);
                callback(err, null);
            }

            // Query result
            console.log(result);
            combinedResult += result; 

            // Deleting date table
            pool.query(sql_date, (err, result) => {
                console.log("Deleting DATE");
                
                if (err) {
                    console.log("ERROR: Problem with deleting query on date table: ", err);
                    callback(err, null);
                }

                // Query result
                console.log(result);
                combinedResult += result; 

                // Deleting items table
                pool.query(sql_items, (err, result) => {
                    console.log("Deleting ITEMS");

                    if (err) {
                        console.log("ERROR: Problem with deleting query on items table: ", err);
                        callback(err, null);
                    }

                    // Query result
                    console.log(result);
                    combinedResult += result; 

                    callback(null, combinedResult);

                    // End the query
                    // client.end((err) => {
                    //     if (err) {
                    //         console.log("Error with ending the query: ", err);
                    //         throw err;
                    //     }
                    // });
                });
            });
        });
    // });
}


function selectDB (id, callback) {
    console.log("In selectDB function");

    // pool.connect((err) => {
    //     if (err) {
    //         console.log("Error with DB!");
    //         console.log(err);
    //         callback(err, null);
    //     }

        let sql = "SELECT i.user_name, i.item_id, i.item, i.item_type, i.remark, (SELECT c.cost FROM cost c WHERE c.cost_id = i.cost_id) AS cost, (SELECT c.cost_type FROM cost c WHERE c.cost_id = i.cost_id) AS cost_type, (SELECT d.date FROM date d WHERE d.date_id = i.date_id) AS date FROM items i WHERE i.item_id = $1 ORDER BY date";
        
        let select_params = [id];

        pool.query(sql, select_params, (err, result) => {
            if (err) {
                console.log("Error in query, ", err);
                callback(err, null);
            }
            
            // console.log("The result rows of selectItems:\n" + JSON.stringify(result.rows));

            // Return back 
            callback(null, result.rows);

            // client.end((err) => {
            //     if (err) throw err;
            // });
        });
    // });
}


module.exports = deleteItems;