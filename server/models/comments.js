const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    username: String,
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // each comment can only relates to one blog, so it's not in array
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
     }
},
{timestamps: true }
)

const Comments = mongoose.model('comments', CommentSchema);
module.exports = Comments
