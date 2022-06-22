const express = require('express')

const route = express.Router()
const controller = require('../controller/postController');


// API
route.post('/api/posts', controller.create);
route.get('/api/posts', controller.find);
route.put('/api/posts/:id', controller.update);
route.delete('/api/posts/:id', controller.delete);

module.exports = route