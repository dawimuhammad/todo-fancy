const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller-user')

router
      .get('/', userController.getHome)
      .post('/register', userController.register)
      .post('/login', userController.logIn)
//   .post('/update', userController.updateUser)
//   .get('/findUser', userController.findOne);


module.exports = router;
