import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
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


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["username", "mapID"]);
  const userURL = `/user/${cookies.username}`;
  const mapURL = `/map/${cookies.mapID}`;

  return (
    <div>
      <BrowserRouter>
        <NavigationBar getCookie={getCookie}/>

        <div className= "headerBanner"> 
          <bannertext><center> T-Eggletop Map Creator </center></bannertext>
        </div>

        <NavigationBar />
        <div className="body">
          <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/signup" element={
              cookies.username ?
              <Navigate to={userURL} /> :
              <SignUp />
            } />
            <Route path="/signin" element={
              cookies.username ?
              <Navigate to={userURL} /> :
              <SignIn />
            } />
            <Route exact path="/user" element={
              cookies.username ?
              <Navigate to={userURL} /> :
              <Navigate to="/signin" />
            } />
            <Route path="/user/:username" element={
              <Profile />
            } />
            <Route exact path="/map" element={
              cookies.mapID ?
              <Navigate to={mapURL} /> :
              <Creator />
            } />
            <Route path="/map/:mapIDParam" element={
              <Creator />
            } />
            <Route path="/search" element={ <Search /> } />
            <Route path="/admin" element={ <Admin /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;