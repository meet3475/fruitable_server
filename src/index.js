require('dotenv').config()

const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongodb");
const { googleProvider, FacebookProvider } = require("./utils/Provider");
const passport = require("passport");
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
// const connectChat = require("./utils/socketio");


const app = express();

googleProvider();
FacebookProvider();


const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));


app.use(
    '/api/docs',
    express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            url: '/public/api.yaml' // Path to your YAML file
        }
    })
);


app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(require("express-session")({ secret: process.env.EXPRESS_SESSION_SECRET, resave: false, saveUninitialized: false, cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());

connectDB();

// connectChat();

//localhost:3000/api/v1
app.use("/api/v1", routes);

//localhost:8000
app.get('/', (req, res) => {
    req.send("Hello World")
})

app.listen(8000, () => {
    console.log("Server Starte at port 8000.");
})