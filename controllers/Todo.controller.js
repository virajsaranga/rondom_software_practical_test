const TodoTask = require("../models/Todo.model");

//add task
const addTask = (req, res) => {
  const { taskID, task, status } = req.body;

  const todoTask = new TodoTask({
    taskID,
    task,
    status,
  });

  todoTask
    .save()
    .then((addTask) => {
      res.json(addTask);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

//Get the all task details
const getTasks = async (req, res) => {
  try {
    const todoTask = await TodoTask.find();
    res.json(todoTask);
  } catch (error) {
    res.status(400).json(error);
  }
};

//get a task details
const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const todoTask = await TodoTask.findById(taskId);
    res.json(todoTask);
  } catch (error) {
    res.status(400).json(error);
  }
};

//update task details
const updateTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const TaskId = await TodoTask.findById(taskId);

    if (!TaskId) {
      return res.status(404).json("There is no details to update");
    }

    const { taskID, task, status } = req.body;

    const updateTask = await TodoTask.findByIdAndUpdate(taskId, {
      taskID,
      task,
      status,
    });

    res.status(200).json(updateTask);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// remove details
const removeTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const TodoTask = await TodoTask.findById(taskId);

    if (!TodoTask) {
      return res.status(404).json("There is no details to remove");
    }

    const removeTask = await TodoTask.findByIdAndDelete(taskId);
    res.status(200).json(removeTask);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  removeTask,
};
