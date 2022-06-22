const Users = require("../models");
const Posts = require("../models");
const User = Users.Users 
const post = Posts.Posts
const router = require('express').Router();
const bcrypt = require('bcrypt');


// GET
router.get('/:id', async (req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc;
        res.status(200).send(user);
    }catch(err){
        console.log(err)
        res.status(500).send({message:err||"Cannot find User"})
    }
})


// UPDATE
router.put('/:id', async (req, res) =>{
    if(req.body.id === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
           const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
           res.status(200).send(updatedUser)
        }catch(err){
            console.log(err)
            res.status(500).send({message: err|| "Error creating user"})
        }
    }else {
        res.status(401).send("You can Update only your Account!")
    }
});


// DELETE
router.delete("/:id", async (req, res) =>{
    if (req.body.id === req.params.id){
        const user = await User.findById(req.params.id);
        if(user){
            try{
                await post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).send("User has been deleted");
            }catch(err){
                res.status(500).send({message:err})
            }
        }else{
            res.status(404).send("User not found")
        }
    }else{
        res.status(401).json("You can delete only YOur account!");
    }
})

module.exports = router;