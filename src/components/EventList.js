// src/components/EventList.js
import React from 'react';
import EventCard from './EventCard';
import './EventList.css'; // Make sure this is imported

function EventList({ events, onDeleteEvent, onEditEvent }) {
  if (events.length === 0) {
    return (
      <div className="no-events-found">
        <p>No events found matching your criteria.</p>
        <p>Try adjusting your search, filters, or add a new event!</p>
      </div>
    );
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDeleteEvent={onDeleteEvent}
          onEditEvent={onEditEvent}
        />
      ))}
    </ul>
  );
}

export default EventList;