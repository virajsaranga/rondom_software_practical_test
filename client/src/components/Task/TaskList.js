import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactPaginate from "react-paginate";
import "./style2.css";

function TaskList() {
  const [Task, setTask] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const tasksPerPage = 5;

  useEffect(() => {
    function getTasks() {
      axios
        .get("http://localhost:5000/api/taskdetails")
        .then((res) => {
          setTask(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getTasks();
  }, []);

  function deleteTask(_id) {
    axios
      .delete("http://localhost:5000/api/taskdetails/" + _id)
      .then((res) => {
        console.log(res.data);
        alert("Details deleted");
      })
      .catch((err) => {
        alert(err);
      });

    setTask(Task.filter((task) => task._id !== _id));
  }

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }

  const sortedTasks = [...Task];
  if (sortBy) {
    sortedTasks.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy].localeCompare(b[sortBy]);
      } else {
        return b[sortBy].localeCompare(a[sortBy]);
      }
    });
  }

  const offset = currentPage * tasksPerPage;
  const currentPageTasks = sortedTasks.slice(offset, offset + tasksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  function filterData(task, searchKey) {
    const result = task.filter((task) => {
      return task.taskID.toLowerCase().includes(searchKey.toLowerCase());
    });

    setTask(result);
  }

  function handleSearchArea(e) {
    const searchKey = e.target.value;

    axios.get("http://localhost:5000/api/taskdetails").then((res) => {
      filterData(res.data, searchKey);
    });
  }

  return (
    <div className="all">
      <br />
      <h1 className="heading"> Todo List </h1>
      <br />
      <div className="add-get-btn">
        <a href="/AddTask">
          <br />
          <button type="button" className="button_getreport">
            <b> ➕ Add Task</b>
          </button>
        </a>
      </div>
      <div className="searchBar-task">
        <input
          type="text"
          className="form-control rounded"
          placeholder="Search ID"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={handleSearchArea}
        />
      </div>
      <br />
      <div className="table_task">
        <div className="table table-success table-striped">
          <table className="table table-bordered">
            <thead className="">
              <tr>
                <th scope="col"></th>
                <th className="table-secondary" scope="col">
                  Task ID
                </th>
                <th className="table-danger" scope="col">
                  Task Title{" "}
                  <button
                    className="sort-btn"
                    onClick={() => handleSort("task")}
                  >
                    Sort
                  </button>
                </th>
                <th className="table-warning" scope="col">
                  Status{" "}
                  <button
                    className="sort-btn"
                    onClick={() => handleSort("status")}
                  >
                    Sort
                  </button>
                </th>
                <th className="table-warning" scope="col">
                  Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody className="table-light">
              {currentPageTasks.map((task, index) => {
                return (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.taskID}</td>
                    <td>{task.task}</td>
                    <td>{task.status}</td>
                    <td>
                      <div className="editbtn">
                        <a
                          className="btn btn-warning"
                          href={`/EditTask/${task._id}`}
                        >
                          <EditIcon />
                          <b>Edit</b>
                        </a>
                      </div>

                      <div className="deletebtn">
                        <a
                          className="btn btn-danger"
                          href="#"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this record?"
                              )
                            )
                              deleteTask(task._id);
                          }}
                        >
                          <DeleteForeverIcon />
                          <b> Delete </b>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(Task.length / tasksPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}

export default TaskList;
