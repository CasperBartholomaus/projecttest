module.exports = function (app, log) {
    app.use("/", require("./routes/proxy-routes"), function (err, req, res, next) {
        log.error(err.message ? err.message : err);
        res.send({
            server: 'server-proxy',
            status: "error",
            msg: err.message ? err.message : err,
        });
        next();
    });
};