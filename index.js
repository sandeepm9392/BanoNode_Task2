const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoutes = require( "./RouterController/auths.js" );
const postRoutes = require( "./RouterController/posts.js" );
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
app.use(express.json());

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            throw err;
        });
};

app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json());
app.use("/api/user",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(8000, () => {
    connect();
    console.log("server listening at port 8000.....")
})