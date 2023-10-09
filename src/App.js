import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import React from 'react';
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Dashboard from './pages/dashboard/dashboard.jsx'
import MenuDetails from "./pages/menuDetails/menuDetails.jsx";
import UserList from "./pages/userList/userList.jsx"


function App() {


  return (
    <>
    <BrowserRouter>
    <div className="App">
      <>
      <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/" element={<Login />} />
          <Route path= "/menuId/:id" element = {<MenuDetails/>} />
      </Routes>
      </>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
