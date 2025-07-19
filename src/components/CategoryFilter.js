// src/components/CategoryFilter.js
import React from 'react';
import './CategoryFilter.css'; // We'll create this CSS file next!

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter-container">
      <label htmlFor="category-select" className="filter-label">Filter by Category:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        {/* The 'All' option will show all events regardless of category */}
        <option value="All">All Categories</option>
        {/* Map through the unique categories to create options */}
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;