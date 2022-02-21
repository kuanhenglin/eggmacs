import { useState } from "react";
import { Link } from 'react-router-dom';
import SearchText from "../components/SearchText";
import { SearchResultUser } from "../components/SearchResult";

import searchUsers from "../methods/search";

import { useCookies } from 'react-cookie';

function Search() {
  document.title = "Search | T-Eggletop";

  const searchOptions = [
    { label: "Maps", value: "map" },
    { label: "Assets", value: "asset" },
    { label: "Users", value: "user" }
  ]

  const [search, setSearch] = useState(null);
  const [searchOption, setSearchOption] = useState(searchOptions[0].value);
  const [searchResult, setSearchResult] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
    
  const getCookie = () => {return cookies};

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
      const result = await searchUsers(search);
      setSearchResult(result);
    } else {
      return;
    }
  }

  function displayResult() {
    if (!getCookie().username){
      return (<p><i>You must be signed in to search. <Link to="/signin" className="hypertext">Sign in here!</Link></i></p>)
    }
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
      <p>Search for homebrew maps, assets, and users.</p>
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