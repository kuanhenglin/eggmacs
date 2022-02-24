import { BrowserRouter, Routes, Route, Navigate, useParams, useMatch} from "react-router-dom";
import { useCookies } from 'react-cookie';

import "./App.css";

import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Creator from "./pages/Creator"
import Search from "./pages/Search"

import Admin from "./pages/Admin";

import UserPage from "./pages/Profiles/UserPage"


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const getCookie = () => {return cookies};
  return (
    <div>
      <BrowserRouter>
        <NavigationBar getCookie={getCookie}/>
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
            <Route path="/admin" element={ <Admin /> } />
            <Route path="/profile/:userId" element={ <UserPage getCookie={getCookie} removeCookie={removeCookie}/> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;