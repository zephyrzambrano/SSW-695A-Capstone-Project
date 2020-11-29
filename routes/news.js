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

router.get("/Videos", async (req, res) => {
    try {
        res.render("news/videos.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
        // res.status(404).send(error);
    }
});

router.get("/CDC-2019-Novel-Coronavirus", async (req, res) => {
    try {
        res.render("news/CDC-2019-Novel-Coronavirus.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
        // res.status(404).send(error);
    }
});

router.get("/CDC-COVID-19-Science-Updates-Feed", async (req, res) => {
    try {
        res.render("news/CDC-COVID-19-Science-Updates-Feed.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
        // res.status(404).send(error);
    }
});

module.exports = router;