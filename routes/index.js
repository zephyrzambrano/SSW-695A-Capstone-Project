const homeRoutes = require("./home");
const newsRoutes = require("./news");
const mapRoutes = require("./map");
const resourcesRoutes = require("./resources");

const constructorMethod = app => {

    app.use("/home", homeRoutes);
    app.use("/news", newsRoutes);
    app.use("/map", mapRoutes);
    app.use("/resources", resourcesRoutes);

    app.get('/', (req, res) => {
        res.redirect("/home");
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;