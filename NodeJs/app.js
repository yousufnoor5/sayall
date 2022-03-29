const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const routes = require("./routes");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const formidableMiddleware = require('express-formidable');
const Constants = require("./Constants");

global.secret = Constants.secret;

//frontend url without end forward slash / ! ex https://google.com
global.frontendUrl = Constants.frontendUrl;

//to get post data on express
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//ALLOWING CORS !
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', Constants.frontendUrl);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

//making images directory static
app.use('/images', express.static(__dirname + '/images'));

// to get multipart data for images and body
app.use(formidableMiddleware());

//to get cookie
app.use(cookieParser());

//cors
app.use(cors({credentials: true, origin: global.frontendUrl}));

//session
app.use(session({
    secret: Constants.secret,
    resave: false,
    saveUninitialized: true,
    name : "token",
    cookie: { httpOnly: false, domain:'.yourDomain.com'}
}));

//routes
routes(app);

//listen to port
app.listen(port , () => {
    console.log(`Running on port : ${port}`);
});