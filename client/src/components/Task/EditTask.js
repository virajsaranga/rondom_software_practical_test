import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";
import "./style2.css"; // Import the CSS file for styles

function EditTask() {
  const [valid, setValid] = useState(false);
  const [task, setTask] = useState({
    taskID: "",
    task: "",
    status: "",
  });

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    function getTasks() {
      axios
        .get(`http://localhost:5000/api/taskdetails/${id}`)
        .then((res) => {
          setTask(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getTasks();
  }, []);

  function updateData(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/taskdetails/${id}`, task)
      .then(() => {
        alert("Record updated");
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setTask((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="supAddMarksForm">
      <br />
      <h2 className="heading">Edit Details</h2>

      <div className="form">
        <div className="formStyle">
          <form onSubmit={updateData}>
            <div class="form-group row">
              <label for="taskID" className="col-sm-2 col-form-label">
                <b>Task Id </b>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="taskID"
                  name="taskID"
                  placeholder="enter task id"
                  onChange={handleChange}
                  value={task.taskID}
                  disabled
                />
              </div>
            </div>

            <div class="form-group row">
              <label for="task" className="col-sm-2 col-form-label">
                <b>Task title </b>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="task"
                  name="task"
                  placeholder="enter task"
                  onChange={handleChange}
                  value={task.task}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmFor="status" className="col-sm-2 col-form-label">
                <b>Status</b>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  onChange={handleChange}
                  value={task.status}
                  required
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="updateBtn">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
