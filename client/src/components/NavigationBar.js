import { Link } from 'react-router-dom';

function NavigationBar(props) {
  if(!props.getCookie().username){
    return (
      <header id="navigation-bar">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/creator">Creator</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </nav>
      </header>
    );    
  }else{
     return (
      <header id="navigation-bar">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/creator">Creator</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
    );    
  }

}

export default NavigationBar;