import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style2.css";

function AddTask() {
  const [valid, setValid] = useState(false);
  const [task, setTask] = useState({
    taskID: "",
    task: "",
    status: "pending",
  });

  let navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/taskdetails", task)
      .then(() => {
        alert("Task added successfully");
        setValid(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });

    setTask({
      taskID: "",
      task: "",
      status: "todo",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setTask((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <h2 className="heading">Add Task</h2>
      <form className="form" onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="taskID">Task Id</label>
          <input
            type="text"
            className="form-control"
            id="taskID"
            name="taskID"
            placeholder="Enter task id"
            onChange={handleChange}
            value={task.taskID}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task">Task Name</label>
          <input
            type="text"
            className="form-control"
            id="task"
            name="task"
            placeholder="Enter task title"
            onChange={handleChange}
            value={task.task}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            onChange={handleChange}
            value={task.status}
            required
          >
            <option value="todo">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="addTask-btn">
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
