const express = require("express");
const path = require("path")
const router = express.Router();
const data = require("../data");

router.get("/", async (req, res) => {
    try {
        res.render("news/news.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
        // res.status(404).send(error);
    }
});

router.get("/test", async (req, res) => {
    try {
        res.render("news/test.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
        // res.status(404).send(error);
    }
});

router.get("/test2", async (req, res) => {
    try {
        res.render("news/test2.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
        // res.status(404).send(error);
    }
});

module.exports = router;