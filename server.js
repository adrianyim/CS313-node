require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyparser = require("body-parser"); 

const db = require("./js/queries");
const home = require("./js/home");
const login = require("./js/login");
const selected = require("./js/select");
const inserted = require("./js/insert");

const app = express();

//Use server, public file
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secure: true,
    secret: "Secret?",
    saveUninitialized: false,
    resave: false
}));

//Set server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", (process.env.PORT || 1010));

app.use("/login", login);
app.use("/home", home);

// Select
app.get("/selectItems", selected);
// app.get("/selectItems/:username", selectItems); 

// Insert
app.post("/insertItems", inserted);

// Update
app.put("/updateItems", db.updateItems);

// Delete
app.delete("/deleteItems", db.deleteItems);

//Listen server
app.listen(app.get("port"), () => {
    console.log("Listening for connections on: ", app.get("port"));
});
