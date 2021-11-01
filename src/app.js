// run requires scripts
require("dotenv").config();
require("../dbConection/db");
const path = require("path")
// bodyParser = require("body-parser");

// call required packages
const express = require("express");
// create express instance
const app = express();
const cors = require('cors');

//use json and urlencoded middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );

app.get("/findAsset/:name", (req, res) => {
    let name = path.join(__dirname, "../", req.params.name)
    res.sendFile(name)
})

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

//  route files
const userRoutes = require("../routes/userRoutes");
const projectRoutes = require('../routes/projectsRoutes')
// const contactRoutes=require('../routes/contactRoutes')

app.use("/user", userRoutes);
app.use('/project', projectRoutes)
// app.use('/contact',contactRoutes)

module.exports = app;
