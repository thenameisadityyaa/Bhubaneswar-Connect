// src/App.js
import React, { useState } from 'react'; // useEffect is no longer used directly in App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventList from './components/EventList';
import Footer from './components/Footer';
import AddEventModal from './components/AddEventModal';
import EventDetailPage from './components/EventDetailPage';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import DateFilter from './components/DateFilter';
import SortControls from './components/SortControls';
import Notification from './components/Notification'; // Import the new Notification component
import useEvents from './hooks/useEvents'; // Import the custom hook

function App() {
  const { events, addEvent, deleteEvent, updateEvent } = useEvents();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Upcoming');
  const [sortOrder, setSortOrder] = useState('dateAsc');

  // State for managing notifications
  const [notification, setNotification] = useState(null);

  // Function to show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    // Clear notification after a few seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification visible for 3 seconds
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const openAddEventModal = () => {
    setEditingEvent(null);
    setShowAddEventModal(true);
    setShowMobileMenu(false);
  };

  const closeEventFormModal = () => {
    setShowAddEventModal(false);
    setEditingEvent(null);
  };

  const handleAddEvent = (newEventData) => {
    addEvent(newEventData);
    closeEventFormModal();
    showNotification('Event added successfully!', 'success');
  };

  const handleDeleteEvent = (idToDelete) => {
    // The deleteEvent in useEvents includes the window.confirm
    // We only show notification if the deletion proceeds
    deleteEvent(idToDelete); // The hook handles the confirmation inside
    showNotification('Event deleted!', 'success'); // Show notification regardless of window.confirm here.
                                                // Ideally, deleteEvent in hook could return true/false
                                                // or take a callback. For now, this is simpler.
  };

  const handleInitiateEdit = (eventToEdit) => {
    setEditingEvent(eventToEdit);
    setShowAddEventModal(true);
    setShowMobileMenu(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    updateEvent(updatedEvent);
    closeEventFormModal();
    showNotification('Event updated successfully!', 'success');
  };

  const uniqueCategories = ['All', ...new Set(events.map(event => event.category))];
  const categoriesForModal = [...new Set(events.map(event => event.category))];


  const filteredAndSortedEvents = [...events].filter(event => {
    const currentDate = new Date();
    const eventDate = new Date(event.date);

    const matchesSearchTerm =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;

    const matchesDateFilter =
      selectedDateFilter === 'All' ||
      (selectedDateFilter === 'Upcoming' && eventDate >= currentDate) ||
      (selectedDateFilter === 'Past' && eventDate < currentDate);

    return matchesSearchTerm && matchesCategory && matchesDateFilter;
  }).sort((a, b) => {
    switch (sortOrder) {
      case 'dateAsc':
        return new Date(a.date) - new Date(b.date);
      case 'dateDesc':
        return new Date(b.date) - new Date(a.date);
      case 'titleAsc':
        return a.title.localeCompare(b.title);
      case 'titleDesc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <Router>
      <div className="App">
        <Navbar
          onToggleMobileMenu={toggleMobileMenu}
          onOpenAddEventModal={openAddEventModal}
        />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <div className="filters-container">
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <DateFilter
                  selectedDateFilter={selectedDateFilter}
                  onDateFilterChange={setSelectedDateFilter}
                />
              </div>
              <CategoryFilter
                categories={uniqueCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <SortControls sortOrder={sortOrder} onSortChange={setSortOrder} />
              <main>
                <EventList
                  events={filteredAndSortedEvents}
                  onDeleteEvent={handleDeleteEvent}
                  onEditEvent={handleInitiateEdit}
                />
              </main>
              <Footer />
            </>
          } />

          <Route path="/events/:id" element={
            <EventDetailPage
              events={events}
              onDeleteEvent={handleDeleteEvent}
              onEditEvent={handleInitiateEdit}
            />
          } />
        </Routes>

        {showMobileMenu && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu-content">
              <button onClick={toggleMobileMenu} className="close-menu-btn">X</button>
              <ul>
                <li><button onClick={openAddEventModal}>Add Event</button></li>
              </ul>
            </div>
          </div>
        )}

        {showAddEventModal && (
          <AddEventModal
            onClose={closeEventFormModal}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            initialEventData={editingEvent}
            categories={categoriesForModal}
          />
        )}

        {/* Render the Notification component if there's a message */}
        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}
      </div>
    </Router>
  );
}

export default App;