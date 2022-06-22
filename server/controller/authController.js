const Users = require("../models");
const User = Users.Users 
const router = require('express').Router();
const bcrypt = require("bcrypt");

// Register
router.post('/register', async (req, res) =>{
    if(!req.body){
        res.status(400).send({message: "Input Cannot be blank"})
        return;     
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass =  await bcrypt.hash(req.body.password, salt); 
        const newUser = new User({
            name: req.body.name,
            username : req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).send(user);
    }catch(err){
        console.log(err)
        res.status(500).send({message: err|| "Error creating user"})
    }
});

router.post('/login', async (req, res) =>{
    if(!req.body){
        res.status(400).send({message: "Input Cannot be blank"})
        return;
    }try{

        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).send({message:"Wrong Username or password"});
        
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).send({message: "Wrong Username or password"});
        
        const { password, ...others } =  user._doc;
        res.status(200).send(others)
    }catch(err){
        console.log(err)
        res.status(500).send({message: err})
    }
})

module.exports = router