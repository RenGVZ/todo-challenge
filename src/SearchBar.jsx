import React, { useEffect } from "react";

const SearchBar = ({query, handleChange}) => {
  return (
    <div className="search-bar">
      Search by title includes:
      <input value={query} onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
};

export default SearchBar;
