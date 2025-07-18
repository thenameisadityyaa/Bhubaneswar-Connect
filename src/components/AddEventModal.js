// src/components/AddEventModal.js
import React, { useState } from 'react';
import './AddEventModal.css';

function AddEventModal({ onClose, onAddEvent }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !description || !location) { // Corrected: !description
      alert('Please fill in all required fields (Title, Date, Description, Location).');
      return;
    }

    const newEvent = {
      title,
      date,
      description,
      location,
      imageUrl: imageUrl || 'https://via.placeholder.com/300x200?text=No+Image',
    };

    onAddEvent(newEvent);

    // Reset form fields after submission
    setTitle('');
    setDate('');
    setDescription('');
    setLocation('');
    setImageUrl('');

    // onClose(); // No need to close here, as handleAddEvent already calls it
  };

  // New function to handle clicks on the overlay
  const handleOverlayClick = (e) => {
    // Only close the modal if the click originated directly on the overlay
    // and not on any of its children (like the modal-content box)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Attach the handleOverlayClick function to the modal-overlay div
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>X</button>
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Event Title:
            <input
              type="text"
              placeholder="e.g., Community Clean-up Drive"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Event Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              placeholder="e.g., Ekamra Kanan, Nayapalli"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              placeholder="Tell us more about the event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>
          <label>
            Image URL (Optional):
            <input
              type="text"
              placeholder="/images/your-image.jpg or https://example.com/image.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <button type="submit">Submit Event</button>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;