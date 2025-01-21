const {authenticate} = require('../middleware/authMiddleware');

module.exports = app => { 
    
    const userController = require("../controllers/utilisateur.controllers.js");

    let router = require('express').Router();

    router.post('/register', userController.registerUser);
    router.post('/login', userController.loginUser);
    router.get('/user', authenticate, userController.getUser);

    app.use('/api/utilisateur', router);
}