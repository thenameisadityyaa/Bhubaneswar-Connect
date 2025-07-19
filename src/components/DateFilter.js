// src/components/DateFilter.js
import React from 'react';
import './DateFilter.css'; // We'll create this CSS file next!

function DateFilter({ selectedDateFilter, onDateFilterChange }) {
  return (
    <div className="date-filter-container">
      <label htmlFor="date-select" className="filter-label">Filter by Date:</label>
      <select
        id="date-select"
        value={selectedDateFilter}
        onChange={(e) => onDateFilterChange(e.target.value)}
        className="date-select"
      >
        <option value="Upcoming">Upcoming Events</option>
        <option value="Past">Past Events</option>
        <option value="All">All Dates</option>
      </select>
    </div>
  );
}

export default DateFilter;