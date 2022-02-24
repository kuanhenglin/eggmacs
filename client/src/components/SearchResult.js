import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function SearchResultMap(props) {
  return (
    <div>

    </div>
  );
}


function SearchResultAsset(props) {
  return (
    <div>

    </div>
  );
}


function SearchResultUser(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const getCookie = () => {return cookies};
  return (
    <div>
      {props.users.map(user => {
        return(
          <p className="search-result" key={user._id}>
            <b><Link to={`/user/${user._id}`} className="hypertext">
              {user.displayName}
            </Link></b>
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
  SearchResultAsset,
  SearchResultUser
};