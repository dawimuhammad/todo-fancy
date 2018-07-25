const express = require('express');
const router = express.Router();
const taskController = require('../controllers/controller-task')

router
      .get('/', taskController.getHome)
      .get('/one', taskController.getTaskByID)
      .get('/all', taskController.getAllTasks)
      .post('/insert', taskController.createTask)
      .delete('/delete', taskController.deleteTask)
      .put('/update', taskController.update)

module.exports = router
