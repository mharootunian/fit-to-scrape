const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: "Article must have a title"
    },
    link: {
        type: String,
        require: "Article must have a link"
    },
    summary: {
        type: String,
        require: "Article must have a summary"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;