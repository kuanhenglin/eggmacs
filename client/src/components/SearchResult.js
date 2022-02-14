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
  return (
    <div>
      {props.users.map(user => {
        return(
          <p className="search-result" key={user._id}>
            <b>{user.displayName}</b>
            (<span className="username">{user._id}</span>)<br />
            <i>{user.description}</i> <br />
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