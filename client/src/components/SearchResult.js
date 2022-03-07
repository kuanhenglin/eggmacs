import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function SearchResultMap(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["mapID"]);

  return (
    <div>
      {props.maps.map(map => {
        return(
          <p className="search-result" key={map._id}>
            <b>
              <Link
                className="hypertext"
                to={`/map/${map._id}`}
                onClick={(e) => setCookie("mapID", map._id, { path: "/" })}
              >
                {map.displayName}  
              </Link>
            </b> 
            &nbsp;(<span className="mapname">{map._id}</span>)<br />
            <i>{map.description}</i><br />
          </p>
        )
      })}
    </div>
  );
}

function SearchResultUser(props) {
  return (
    <div>
      {props.users.map(user => {
        return(
          <p className="search-result" key={user._id}>
            <b>
              <Link
                className="hypertext"
                to={`/user/${user._id}`}
              >
                {user.displayName}
              </Link>
            </b>
            &nbsp;(<span className="username">{user._id}</span>)<br />
            <i>{user.description}</i><br />
          </p>
        )
      })}
    </div>
  );
}


export {
  SearchResultMap,
  SearchResultUser
};