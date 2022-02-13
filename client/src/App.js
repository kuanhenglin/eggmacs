import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import "./App.css";

import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Creator from "./pages/Creator"
import Search from "./pages/Search"


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);

  function getCookie() {
    return cookies;
  }

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <div className="body">
          <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/signup" element={
              cookies.username ?
              <Navigate to="/profile" /> :
              <SignUp getCookie={getCookie} setCookie={setCookie} />
            } />
            <Route path="/signin" element={
              cookies.username ?
              <Navigate to="/profile" /> :
              <SignIn getCookie={getCookie} setCookie={setCookie} />
            } />
            <Route path="/profile" element={
              cookies.username ?
              <Profile getCookie={getCookie} removeCookie={removeCookie} /> :
              <Navigate to="/signin" />
            } />
            <Route path="/creator" element={ <Creator /> } />
            <Route path="/search" element={ <Search /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;