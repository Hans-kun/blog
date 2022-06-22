const Comments = require("../models");
const Posts = require("../models");
const Comment = Comments.Comments
const Post = Posts.Posts
const router = require('express').Router();


// Post 
router.post('/:id/comment', async (req, res) =>{
    // find out which post you are commenting
    const id = req.params.id;
    // get the comment text and record post id
    try{
        const comment = new Comment({
            text: req.body.comment,
            post: id
        })
        //  save comment
        await comment.save();
        // get this particular post 
        // const post = await Post.findById(id);
        // // push the comment into the post.comments array
        // post.comments.push(comment);
        // newcomment = await post.save();
        res.status(200).send(comment)
        // console.log(post.comments[0].text)
    }catch(err){
        res.status(500).send({message: err|| "Sorry An Error Occured"})
    }

})


// get
router.delete("/:postId/comment/:commentId", async (req, res) =>{
    const post_id = req.params.postId;
    const comment_id = req.params.commentId;
    try{
        const post = await Post.findByIdAndUpdate(post_id, {$pull: {comment: comment_id}},{new: true});

        if(!post) {
            return res.status(400).send("Post not found");
        }

        await Comment.findByIdAndDelete(comment_id);

        res.status(200).send("Successfully Deleted");
    }catch(err){
        res.status(500).send("something went wrong");
    }
});


module.exports = router;