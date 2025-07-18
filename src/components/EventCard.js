// src/components/EventCard.js
import React from 'react';
import './EventCard.css';

// EventCard now accepts an 'event' prop
function EventCard({ event }) { // Destructure the event prop
  // Optional: Format date for better display
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="event-card">
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="event-card-image" />
      )}
      <h3>{event.title}</h3> {/* Use event.title */}
      <p>Date: {formattedDate}</p> {/* Use formatted date */}
      <p>Location: {event.location}</p> {/* Display location */}
      <p>{event.description}</p> {/* Use event.description */}
      <button>View Details</button>
    </div>
  );
}

export default EventCard;