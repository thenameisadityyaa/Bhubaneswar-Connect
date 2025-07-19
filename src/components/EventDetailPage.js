// src/components/EventDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetailPage.css'; // Make sure this line is present and correct

function EventDetailPage({ events, onDeleteEvent, onEditEvent }) {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [event, setEvent] = useState(null); // State to hold the found event

  useEffect(() => {
    // Find the event based on the ID from the URL params
    const foundEvent = events.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
  }, [id, events]); // Re-run if ID or events list changes

  // If event is not found (e.g., direct navigation to invalid ID)
  if (!event) {
    return <div className="event-detail-page-container">Event not found.</div>;
  }

  const handleDelete = () => {
    onDeleteEvent(event.id);
    navigate('/'); // Go back to the home page after deletion
  };

  const handleEdit = () => {
    onEditEvent(event);
    // The AddEventModal will open automatically via App.js state management
  };

  return (
    <div className="event-detail-page-container">
      <button onClick={() => navigate('/')} className="back-button">
        &larr; Back to Events
      </button>
      <img
        src={event.imageUrl || '/images/default-event.jpg'} // Fallback image
        alt={event.title}
        className="event-detail-image"
      />
      <h1 className="event-detail-title">{event.title}</h1>
      <p className="event-detail-info"><strong>Date:</strong> {event.date}</p>
      <p className="event-detail-info"><strong>Location:</strong> {event.location}</p>
      <p className="event-detail-info"><strong>Category:</strong> {event.category}</p>
      <p className="event-detail-description">{event.description}</p>

      {/* This div is crucial for styling the action buttons */}
      <div className="event-detail-actions">
        <button onClick={handleEdit} className="edit-button">Edit Event</button>
        <button onClick={handleDelete} className="delete-button">Delete Event</button>
      </div>
    </div>
  );
}

export default EventDetailPage;