const express = require("express");
const path = require("path");
const hbs = require("hbs");
const userRoutes = require("../routes/userRoutes");

const app = express();

const staticFilesDir = path.join(__dirname, "../public");
const viewsfiles = path.join(__dirname, "../frontend/views");
const partialfiles = path.join(__dirname, "../frontend/layouts");

app.set("view engine", "hbs");

app.use(express.static(staticFilesDir));
app.set("views", viewsfiles);
hbs.registerPartials(partialfiles);

app.use(express.urlencoded({extended:true}))

app.use(userRoutes);



app.get("*", (req,res)=>{res.render('error', {pageTitle:"page not found"})})
module.exports = app

