import { useState } from "react";
import { Link } from 'react-router-dom';
import SearchText from "../components/SearchText";
import { SearchResultUser } from "../components/SearchResult";

import { searchObjects } from "../methods/search";

import { useCookies } from 'react-cookie';

function Search() {
  document.title = "Search | T-Eggletop";

  const searchOptions = [
    { label: "Maps", value: "map" },
    { label: "Users", value: "user" }
  ]

  const [search, setSearch] = useState(null);
  const [searchOption, setSearchOption] = useState(searchOptions[0].value);
  const [searchResult, setSearchResult] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);

  const searchText = {
    placeholder: "Your search term(s) and phrase(s).",
    onChange: setSearch,
    onKeyPress: handleEnter
  }
  const searchSelect = {
    onChange: setSearchOption,
    options: searchOptions
  }
  const searchButton = {
    label: "Search",
    onClick: handleSearch
  }

  function handleEnter(key) {
    if (key === "Enter") handleSearch()
  }

  async function handleSearch() {
    if (searchOption === "user") {
      const result = await searchObjects(search, "users");
      setSearchResult(result);
    } else {
      return;
    }
  }

  function displayResult() {
    // if (!cookies.username){
    //   return (
    //     <p><i>
    //       You must be
    //       <Link to="/signin" className="hypertext"> signed in </Link>
    //       to search.
    //     </i></p>
    //   )
    // }
    if (searchOption === "user") {
      return (
        <SearchResultUser users={searchResult}/>
      );
    } else {
      return (
        <p><i>Other search options are coming soon.</i></p>
      );
    }
  }

  return (
    <div>
      <h1>Search</h1>
      <p>Search for homebrew maps and users.</p>
      <SearchText
        text={searchText}
        select={searchSelect}
        button={searchButton}
      />
      {displayResult()} <br />
    </div>
  )
}

export default Search;