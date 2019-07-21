const app = require("express").Router();

app.get("/", (req, res, next) => {
    console.log("In signUp page");
    res.render("signUp");
});

module.exports = app;