require('dotenv').config()

const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongodb");
const { googleProvider, FacebookProvider } = require("./utils/Provider");
const passport = require("passport");
const connectChat = require("./utils/socketio");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./src/api.yaml');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser()) 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(require("express-session")({ secret: process.env.EXPRESS_SESSION_SECRET,  resave: false, saveUninitialized: false, cookie: {secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

connectDB();
googleProvider();
FacebookProvider();
connectChat();

//localhost:3000/api/v1
app.use("/api/v1", routes);

app.listen(8000, () => {
    console.log("Server Starte at port 8000.");
})