// src/components/EventCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

// EventCard now accepts onEditEvent prop
function EventCard({ event, onDeleteEvent, onEditEvent }) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link to={`/events/${event.id}`} className="event-card-link">
      <div className="event-card">
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="event-card-image" />
        )}
        <h3>{event.title}</h3>
        <p>Date: {formattedDate}</p>
        <p>Location: {event.location}</p>
        <p className="card-description">{event.description.substring(0, 100)}...</p>

        <div className="event-card-actions">
          <button className="view-details-btn">View Details</button>
          {/* Edit Button */}
          <button
            className="edit-btn" // New class for styling
            onClick={(e) => {
              e.preventDefault(); // Prevent Link from navigating
              e.stopPropagation(); // Prevent Link from navigating
              onEditEvent(event); // Call the edit handler with the entire event object
            }}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDeleteEvent(event.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;