const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const https = require("https");
const { json } = require("express/lib/response");
const { response } = require("express");
const port = 3000;
const StaticFilesDir = path.join(__dirname, "public");
app.use(express.static(StaticFilesDir));
app.set("view engine", "hbs");
staticFiles = path.join(__dirname, "public/css");
viewsFiles = path.join(__dirname, "views");
layouts = path.join(__dirname, "public/layouts");
//use files inside app
app.use(express.static(staticFiles));
app.set("views", viewsFiles);
hbs.registerPartials(layouts);

//routes
app.get("", (req, res) => {
  //localhost:3000
  res.render("home", {
    pageTitle: "Home Page",
  });
});
app.get("/fetchedContent", (req, response) => {
  const apiUrl = "https://breakingbadapi.com/api/quotes";
  let result = "";
  req = https.request(apiUrl, (res) => {
    res.on("data", (dataPart) => {
      result += dataPart.toString();
    });
    res.on("end", () => {
      result = JSON.parse(result);
      response.render("fetchedContent", {
        pageTitle: "fetchedContent Page",
        data: result,
      });
    });
  });
  req.on("error", (err) => {});
  req.end();
});
app.listen(port, () => {
  console.log(`Express is listing to http://localhost:${port}`);
});
