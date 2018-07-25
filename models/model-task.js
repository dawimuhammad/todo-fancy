const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    tags: [],
    due: {
            type: String,
            required: true
    },
    status : {
        type: Boolean,
        required: true,
        default: false
    }
})

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task