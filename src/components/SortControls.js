// src/components/SortControls.js
import React from 'react';
import './SortControls.css'; // Make sure this import is also correct

function SortControls({ sortOrder, onSortChange }) {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-controls-container">
      <label htmlFor="sort-select">Sort by:</label>
      <select id="sort-select" value={sortOrder} onChange={handleSortChange} className="sort-select">
        <option value="dateAsc">Date (Oldest First)</option>
        <option value="dateDesc">Date (Newest First)</option>
        <option value="titleAsc">Title (A-Z)</option>
        <option value="titleDesc">Title (Z-A)</option>
      </select>
    </div>
  );
}

export default SortControls;