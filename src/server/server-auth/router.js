module.exports = function (app, log) {
    app.use("/", require("./routes/auth-routes"), function (err, req, res, next) {
        const messageFormat = {
            server: 'server-auth',
            status: "error",
            msg: err.message ? err.message : err,
        };
        log.error(err.message ? err.message : err);
        console.log(messageFormat);
        res.send(messageFormat);
        next();
    });
};