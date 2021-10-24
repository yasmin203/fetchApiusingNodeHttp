// run requires scripts
require("dotenv").config();
require("../dbConection/db");
// bodyParser = require("body-parser");

// call required packages
const express = require("express");
// create express instance
const app = express();
//use json and urlencoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );

const cors = require('cors');
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

//  route files
const userRoutes = require("../routes/userRoutes");
 const projectRoutes=require('../routes/projectsRoutes')
// const contactRoutes=require('../routes/contactRoutes')

app.use("/user", userRoutes);
app.use('/project',projectRoutes)
// app.use('/contact',contactRoutes)

module.exports = app;
