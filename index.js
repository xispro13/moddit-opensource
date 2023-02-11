//pre-setup
require("dotenv").config();

//requirements
const express = require("express");
const session = require("express-session");
const f = require("mdt-fbase");
const fs = require("fs")

//post-setup
const app = express();
app.set('json spaces', 2);
const http = require("http").Server(app);
const io = require("socket.io")(http);
const db = new f.instance(
	file = "db/" + process.env.DB_NAME + ".edb",
    encodingf = f.AES_ENCODER(process.env.DB_PASS),
	decodingf = f.AES_DECODER(process.env.DB_PASS)
);
db.init();
const m = require('./middle/setupMiddle')
m({app, io, db, session, env: process.env})

//content
io.on('connection', require("./socket/master")({app, io, db, session, env: process.env}))
fs.readdirSync('worker').forEach( w => {
	const full = "./worker/" + w
	require(full)({app, io, db, session, env: process.env})
})

fs.readdirSync('routes').forEach( r => {
        const full = "./routes/" + r
        require(full)({app, io, db, session, env: process.env})
})



//final-setup
http.listen(process.env.PORT, () => {
	console.log(`Moddit listening on ${process.env.PORT}`)
})
