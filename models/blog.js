const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;  