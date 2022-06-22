const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const authRoute = require("./server/controller/authController")
const userRoute = require("./server/controller/userController")
const commentRoute = require("./server/controller/commentCont")

const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.port||8080

// log request 
app.use(morgan('tiny'));

// mongodb connection
connectDB();


// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

// app.get('/', (req,res)=>{
//     res.send("Node Express Application")
// });

// load routers
app.use('/', require('./server/routes/router'));
app.use('/api/auth', authRoute);
app.use('/api/user/', userRoute);
app.use('/api/posts/', commentRoute);


app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)})