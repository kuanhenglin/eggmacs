import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Creator from "./pages/Creator"
import Search from "./pages/Search"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/login" element={ <Login /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/creator" element={ <Creator /> } />
          <Route path="/search" element={ <Search /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;