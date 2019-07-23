require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyparser = require("body-parser"); 

// ejs pages
const home = require("./js/home");
const login = require("./js/login");
const signUp = require("./js/signUp");
const updateItem = require("./js/updateItem");

// queries
const db = require("./js/queries");
const selected = require("./js/select");
const inserted = require("./js/insert");
const updated = require("./js/update");
const deleted = require("./js/delete");
const create = require("./js/create");

const app = express();

// Use server, public file
// app.use(express.static(path.join(__dirname, "stylesheets")));
app.use("/js", express.static("./js/"));
app.use("/stylesheets", express.static("./stylesheets/"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secure: true,
    secret: "Secret?",
    saveUninitialized: false,
    resave: false
}));

// Set server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", (process.env.PORT || 1010));

// ejs Page
app.use("/login", login);
app.use("/home", home);
app.use("/signUp", signUp);
app.use("/updateItem", updateItem);

// Select
app.get("/selectItems", selected);
// app.get("/selectItems/:username", selectItems); 

// Insert
app.post("/insertItems", inserted);

// Update
// app.put("/updateItems?id=:id", updated);

// Delete
app.delete("/deleteItems/:id", deleted);

// Create new user
app.post("/create", create);

//Listen server
app.listen(app.get("port"), () => {
    console.log("Listening for connections on: ", app.get("port"));
});
