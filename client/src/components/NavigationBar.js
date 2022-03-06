import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function NavigationBar(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const admins = [
    "jordanlin",
    "theresonlyjuice",
    "the-bay-kay",
    "Shalphan",
    "mvchegg"
  ];

  if (cookies.username) {
    if (admins.includes(cookies.username)) {
      return (
        <header id="navigation-bar">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/map">Creator</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to={`/user`}>Profile</Link></li>
              <li><Link to={`/admin`}><i>Admin</i></Link></li>
            </ul>
          </nav>
        </header>
      );
    } else {
      return (
        <header id="navigation-bar">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/map">Creator</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to={`/user`}>Profile</Link></li>
            </ul>
          </nav>
        </header>
      );
    }
  } else {
    return (
      <header id="navigation-bar">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/map">Creator</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </nav>
      </header>
    );
  }

}

export default NavigationBar;
