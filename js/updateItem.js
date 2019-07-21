const app = require("express").Router();

app.get("/", (req, res, next) => {
    console.log("In updateItem page");
    res.render("updateItem?id=:id", {

    });
});

module.exports = app;
