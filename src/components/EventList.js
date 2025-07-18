// src/components/EventList.js
import React from 'react';
import EventCard from './EventCard';
import './EventList.css';

// EventList now accepts an 'events' prop
function EventList({ events }) { // Destructure the events prop
  return (
    <section className="event-list">
      <h2>Upcoming Events</h2>
      <div className="event-grid">
        {/* Use map() to render an EventCard for each event */}
        {events.map(event => (
          // Important: Add a unique 'key' prop when mapping over lists in React
          // The key helps React identify which items have changed, are added, or are removed.
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

export default EventList;