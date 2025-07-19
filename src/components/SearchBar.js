// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css'; // We'll create this CSS file next!

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search events by title, description, or location..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;