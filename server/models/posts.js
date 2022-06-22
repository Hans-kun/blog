const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    post_detail: {
        type: String,
        required: true
    },

    images: {
        type: String,
        // required: true,
    },

    username: {
        type: String,
        required: true
    },

    // comments:[ {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    // }],

},
{timestamps: true }
)


const Posts = mongoose.model('posts', PostSchema);
module.exports = Posts

