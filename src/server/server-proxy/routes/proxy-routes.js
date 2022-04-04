const ProxyRouter = require('express').Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { Logger } = require("./../../logger/Logger");

const logProvider = () => {
    return Logger.getLogger('server-proxy');
};

ProxyRouter.use('/auth', createProxyMiddleware({
    target: 'https://localhost:4000',
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    secure: false,
    logLevel: 'debug',
    logProvider,
}))

module.exports = ProxyRouter;