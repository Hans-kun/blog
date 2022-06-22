const Posts = require("../models")
const Comments =  require("../models")
const Comment = Comments.Comments
const Post = Posts.Posts


// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"})
        return;
    }

    // new post
    // const post = new Post({
    //     title: req.body.title,
    //     post_detail: req.body.post_detail,
    //     images: req.body.images,
    //     comment: req.body.comment,
    // })
    const post = new Post(req.body);
    // save post in the database
    post
        .save(post)
        .then(data=>{
            res.send(data)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}
 
// retrieve and return all posts/retrive and return a single post
exports.find = (req,res)=>{
    const username = req.query.username
    if(req.query.id){
        const id = req.query.id;

        Post.findById(id)
            .then(data=> {
                if(!data){
                    res.status(404).send({message: `Not found post with id ${id}`})
                }else{
                    const comments = Comments.find({post: id})
                    res.send({post: data, comments: comments})
                }            })
            .catch(err=>{
                res.status(500).send({message:`Error retrieving Post with id ${id}`})
            })
    }if(username){
        Post.find({username})
            .then(data=> {
                if(!data){
                    res.status(404).send({message: "Cant find any post post associated with this user"})
                }else{
                    res.status(200).send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message:err|| "An Error Occured"})
            })    
    }else{
        Post.find()
        .then(post=>{
            res.send(post)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error retriving Post Information"})
        })
    }
}

// get and update a post 
exports.update = async (req,res)=>{
    if(!req.body){
        return res.status(400).send({message: "Data to update cannot be empty"})
    }

    const id = req.params.id;
    const post = await Post.findById(id);
    if(post.username === req.body.username){
        Post.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Post Not Found"})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message: err||"Error Updating Post Details"})
            })
    }else{
        res.status(500).send({message: "You can only update your post"})
    }
}

// delete a post with a specified id in the request
exports.delete = async (req,res)=>{
    const id = req.params.id;

    // try{
    //     let foundPost = await Post.findOne()
    // }

    Post.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Cannot Find Data to Delete"})
            }else{
                res.send({message: "Post Succesfully Deleted"})
            }
        })
        .catch(err=>{
            res.status(500).send({message: err||"Could Not Delete Post"})
        })
}