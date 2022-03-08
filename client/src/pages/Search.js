import { useState } from "react";
import SearchText from "../components/SearchText";
import { SearchResultMap, SearchResultUser } from "../components/SearchResult";

import { searchObjects } from "../methods/search";

function Search() {
  document.title = "Search | T-Eggletop";

  const searchOptions = [
    { label: "Maps", value: "map" },
    { label: "Users", value: "user" }
  ]

  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState(searchOptions[0].value);
  const [searchResult, setSearchResult] = useState([]);

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
    } 
    else if (searchOption === "map") {
      const result = await searchObjects(search, "maps");
      setSearchResult(result);
    }
    else {
      return;
    }
  }

  function displayResult() {
    if (searchOption === "user") {
      return (
        <SearchResultUser users={searchResult}/>
      );
    } 
    else if (searchOption === "map") {
      return (
        <SearchResultMap maps={searchResult}/>
      )
    }
    else {
      return (
        <p><i>Other search options are coming soon.</i></p>
      );
    }
  }

  return (
    <div>
      <h2>Search</h2>
      <p><sub>Search for homebrew maps and users.</sub></p>
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