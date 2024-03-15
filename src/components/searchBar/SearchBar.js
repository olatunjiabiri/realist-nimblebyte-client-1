import React from 'react';
import './SearchBar.css'; // Import your CSS file for styling

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input type="text" placeholder="Search any location here" className="search-input" />
      <div className="sort-container">
        <input type="text" placeholder="Min Price" className="sort-input" />
        <div className="dropdown-arrow">&#9660;</div>
      </div>
      <div className="sort-container">
        <input type="text" placeholder="Max Price" className="sort-input" />
        <div className="dropdown-arrow">&#9660;</div>
      </div>
    </div>
  );
};

export default SearchBar;
