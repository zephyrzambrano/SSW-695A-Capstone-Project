const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.render("news/news.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
    }
});

router.get("/test", async (req, res) => {
    try {
        res.render("news/test.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
    }
});

router.get("/test2", async (req, res) => {
    try {
        res.render("news/test2.handlebars");
    }
    catch (error) {
        res.redirect("/home/home.handlebars");
    }
});

module.exports = router;