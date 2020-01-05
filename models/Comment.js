const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: String,
        required: "Article must have a title"
    },
    comment: {
        type: String,
        require: "Article must have a link"
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;