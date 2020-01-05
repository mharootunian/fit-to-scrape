const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//mongoose.connect('mongodb://localhost/fit-to-scrape', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/fit-to-scrape', {useNewUrlParser: true}, function(err) {
    if (err) throw err;
});
const server = app.listen(PORT, () => {
    console.log("Server started.")
})

app.get("/scrape", function(req, res) {

    axios.get("http://rss.cnn.com/rss/cnn_topstories.rss").then(function(response) {

        const $ = cheerio.load(response.data);

        // // yoink every list item with class=regularitem
        // $("regularitem li").each(function(i, element) {
        //
        //     let article = {};
        //
        //     // article.title = $(this).children("itemtitle h4").children("a").text();
        //     // article.link = $(this).children("itemtitle h4").children("a").attr("href");
        //     // article.link = "asd";
        //     article.title = "asd";
        //     article.link = "asd";
        //     article.summary = "asd";
        //
        //     // Create a new Article using the `result` object built from scraping
        //     db.Article.create(article)
        //         .then(function(dbArticle) {
        //             console.log(dbArticle);
        //             console.log("article added");
        //         })
        //         .catch(function(err) {
        //             console.log(err);
        //         });
        // });


        // Send a message to the client
        res.send("Scrape Complete");
    });
});
