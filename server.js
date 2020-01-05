const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const db = require("./models");
const exphbs  = require('express-handlebars');
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//register handlebars as view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/fit-to-scrape', {useNewUrlParser: true}, function(err) {
    if (err) throw err;
});

const server = app.listen(PORT, () => {
    console.log("Server started.")
});

app.get("/", function(req, res) {

});

app.get("/scrape", function(req, res) {

    axios.get("https://text.npr.org/").then(function(response) {

        let $ = cheerio.load(response.data);
console.log(response.data);
        // yoink every list item with class=regularitem
        $("li").each(function(i, element) {

            let article = {};

            article.title = $(this).children("a").text();
            article.link = "https://text.npr.org" + $(this).children("a").attr("href");
            article.summary = "asd";

            // Create a new Article using the `result` object built from scraping
            db.Article.create(article)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                    console.log("article added");
                })
                .catch(function(err) {
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});
