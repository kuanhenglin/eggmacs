import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function SearchResultMap(props) {
  return (
    <div>

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