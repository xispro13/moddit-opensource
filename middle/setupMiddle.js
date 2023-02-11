const express = require("express")

module.exports = function({app, db}) {
    app.set('trust proxy', 1)
    app.use(express.static('static'))
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
}