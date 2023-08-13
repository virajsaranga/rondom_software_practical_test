import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/nav/Header";
import Footer from "./components/nav/Footer";
//support services pages

import TaskList from "./components/Task/TaskList";
import AddTask from "./components/Task/AddTask";
import EditTask from "./components/Task/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<TaskList />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/EditTask/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
