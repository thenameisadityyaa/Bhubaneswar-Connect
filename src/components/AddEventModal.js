// src/components/AddEventModal.js
import React, { useState, useEffect } from 'react';
import './AddEventModal.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enUS } from 'date-fns/locale';

registerLocale('en-US', enUS);

function AddEventModal({ onClose, onAddEvent, onUpdateEvent, initialEventData, categories }) {
  const [title, setTitle] = useState(initialEventData ? initialEventData.title : '');
  const [date, setDate] = useState(initialEventData && initialEventData.date ? new Date(initialEventData.date) : null);
  const [description, setDescription] = useState(initialEventData ? initialEventData.description : '');
  const [location, setLocation] = useState(initialEventData ? initialEventData.location : '');
  const [imageUrl, setImageUrl] = useState(initialEventData ? initialEventData.imageUrl : '');
  const [category, setCategory] = useState(initialEventData ? initialEventData.category : categories[0] || '');
  const [errors, setErrors] = useState({});
  const [imageLoadError, setImageLoadError] = useState(false); // New state for image load error

  const isEditMode = !!initialEventData;

  useEffect(() => {
    if (initialEventData) {
      setTitle(initialEventData.title || '');
      setDate(initialEventData.date ? new Date(initialEventData.date) : null);
      setDescription(initialEventData.description || '');
      setLocation(initialEventData.location || '');
      setImageUrl(initialEventData.imageUrl || '');
      setCategory(initialEventData.category || categories[0] || '');
    } else {
      setTitle('');
      setDate(null);
      setDescription('');
      setLocation('');
      setImageUrl('');
      setCategory(categories[0] || '');
    }
    setErrors({});
    setImageLoadError(false); // Reset image error on modal open/data change
  }, [initialEventData, categories]);

  // Handle image URL change and reset error state
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImageLoadError(false); // Reset error when URL changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!date) {
      newErrors.date = 'Date is required.';
    } else {
      if (isNaN(date.getTime())) {
          newErrors.date = 'Invalid date selected.';
      }
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (!location.trim()) {
      newErrors.location = 'Location is required.';
    }
    if (!category) {
      newErrors.category = 'Category is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    const eventData = { title, date: formattedDate, description, location, imageUrl, category };

    if (isEditMode) {
      onUpdateEvent({ ...eventData, id: initialEventData.id });
    } else {
      onAddEvent(eventData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-modal-btn">X</button>
        <h2>{isEditMode ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              id="date"
              placeholderText="Select a date"
              locale="en-US"
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (optional):</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={handleImageUrlChange} // Use new handler
            />
            {/* Conditional image preview */}
            {imageUrl && !imageLoadError && (
              <div className="image-preview-container">
                <img
                  src={imageUrl}
                  alt=""
                  className="image-preview"
                  onError={() => setImageLoadError(true)} // Set error state on image load failure
                />
              </div>
            )}
            {/* Show error message if image fails to load */}
            {imageUrl && imageLoadError && (
              <span className="error-message">Could not load image from URL.</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.filter(cat => cat !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>
          <button type="submit">{isEditMode ? 'Update Event' : 'Add Event'}</button>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;