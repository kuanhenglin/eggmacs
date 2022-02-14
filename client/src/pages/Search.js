import { useState } from "react";

import SearchText from "../components/SearchText";
import { SearchResultUser } from "../components/SearchResult";

import searchUsers from "../methods/search";

function Search() {
  const searchOptions = [
    { label: "Maps", value: "map" },
    { label: "Assets", value: "asset" },
    { label: "Users", value: "user" }
  ]

  const [search, setSearch] = useState(null);
  const [searchOption, setSearchOption] = useState(searchOptions[0].value);
  const [searchResult, setSearchResult] = useState([]);

  const searchText = {
    placeholder: "Your search term(s) and phrase(s).",
    onChange: setSearch
  }
  const searchSelect = {
    onChange: setSearchOption,
    options: searchOptions
  }
  const searchButton = {
    label: "Search",
    onClick: handleSearch
  }

  async function handleSearch() {
    if (searchOption === "user") {
      const result = await searchUsers(search);
      setSearchResult(result);
    } else {
      window.alert("Other search options are coming soon.");
    }
  }

  function displayResult() {
    if (searchOption === "user") {
      return (
        <SearchResultUser users={searchResult}/>
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
      {displayResult()}
    </div>
  )
}

export default Search;