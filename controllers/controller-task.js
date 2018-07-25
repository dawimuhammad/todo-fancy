const jwt = require ('jsonwebtoken');
const Task = require('../models/model-task')
const moment = require('moment')

class TaskController {
    static getHome (req, res) {
        res.send('You are in Task Route Homepage')
    }

    static createTask(req, res, next) {
        let arrTags = req.body.tags.split(" ")
        let { title, due, tags } = req.body
        let user = jwt.decode(req.headers.token)
        
        console.log('masuk method');
        
        Task.create({
            user: user._id,
            title,
            tags: arrTags,
            due: moment().format('l'),
            status: false
        }, function (err, result) {
            if (err) {
                console.log('error create');
                res.send(err)
            } else {
                console.log('masuk db');
                res.send(result)
            }
        })
    }

    static deleteTask(req, res, next) {
        let taskId = req.body.taskId

        if (taskId === undefined) {
            res
                .status(400)
                .send("no task id to execute process")
        }
        

        Task.findById({ _id : taskId}, function(err, taskFound) {
            if (err) {
                res
                    .status(500)
                    .send(err)
            } else {
                if (taskFound) {
                    Task.deleteOne({ _id : taskId }, function (err, deletedTask) {
                        res
                            .status(200)
                            .send("Successfully deleted a task!")
                    })
                } else {
                        res
                            .status(204)
                            .send("not found")
                }
            }
        })        
    }

    static getAllTasks (req, res, next) {
        Task.find({ }, function(err, tasks) {
            if (err) {
                res
                    .status(500)
                    .send(err)
            } else {
                res
                    .status(200)
                    .send(tasks)
            }
        })
    }

    static getTaskByID (req, res, next) {
        let taskId = req.body.taskId

        Task.findOne({ _id: taskId}, function (err, taskFound) {
            if (err) {
                res
                    .status(500)
                    .send(err)
            } else {
                if (taskFound) {
                    res
                        .status(200)
                        .send(taskFound)
                } else {
                    res
                        .status(204)
                        .send("Task not found")
                }
            }
        })
    }

    static update (req, res, next) {
        let userId = req.body.userId
        let { title, due, status } = req.body

        Task.findOne({ _id: userId}, function(err, foundTask) {
            if (err) {
                res
                    .status(500)
                    .send("error")
            } else {
                if(foundTask) {
                    res
                        if (foundTask.status === false) {
                            foundTask.status = true
                        } else {
                            foundTask.status = false
                        }

                        foundTask.save()
                        res.send(foundTask.status)
                } else {
                    res
                        .status(204)
                        .send("Task not found")
                }
            }
        })
    }
}

module.exports = TaskController