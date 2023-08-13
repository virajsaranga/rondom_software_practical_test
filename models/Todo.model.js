const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  taskID: {
    type: String,
    unique: true,
  },
  task: String,
  status: String,
});

module.exports = TaskDB = mongoose.model("TaskDB", taskSchema);
