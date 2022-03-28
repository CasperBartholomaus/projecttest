const ProxyRouter = require('express').Router();
const { createProxyMiddleware } = require("http-proxy-middleware");

    ProxyRouter.use('/auth', createProxyMiddleware({
        target: 'https://localhost:3001',
        changeOrigin: true,
        pathRewrite: {'^/auth': ''},
        secure: false,
    }))

module.exports = ProxyRouter;