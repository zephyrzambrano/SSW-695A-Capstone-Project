const express = require("express");
const path = require("path")
const router = express.Router();
const data = require("../data");

router.get("/", async (req, res) => {
    try {
        res.render("home/home.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
        // res.status(404).send(error);
    }
});

module.exports = router;