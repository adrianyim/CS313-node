const app = require("express").Router();

app.get("/", (req, res, next) => {
    console.log("In the login page");
    res.render("login");
});

module.exports = app;
