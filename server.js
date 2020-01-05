const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");

app.get("/scrape", function(req, res) {

    axios.get("http://rss.cnn.com/rss/cnn_topstories.rss").then(function(res) {

        const $ = cheerio.load(res.data);

        // yoink every list item with class=regularitem
        $("regularitem li").each(function(i, element) {

            let article = {};

            article.title = $(this).children("itemtitle h4").children("a").text();
            article.link = $(this).children("itemtitle h4").children("a").attr("href");
            // Create a new Article using the `result` object built from scraping
            db.Article.create(article)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});
