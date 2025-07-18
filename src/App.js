// src/App.js
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventList from './components/EventList';
import Footer from './components/Footer';
import AddEventModal from './components/AddEventModal';

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Community Clean-up Drive',
      date: '2025-07-25',
      description: 'Join us to clean up the beautiful Ekamra Kanan park. Gloves and bags provided.',
      location: 'Ekamra Kanan, Nayapalli',
      imageUrl: '/images/cleanup.jpg'
    },
    {
      id: 2,
      title: 'Odia Language Workshop',
      date: '2025-08-10',
      description: 'A beginner-friendly workshop to learn basic conversational Odia phrases and cultural insights.',
      location: 'Odisha State Museum',
      imageUrl: '/images/odia-workshop.png'
    },
    {
      id: 3,
      title: 'Startup Pitch Competition',
      date: '2025-08-15',
      description: 'Watch budding entrepreneurs present their innovative ideas to a panel of investors and mentors.',
      location: 'KIIT TBI',
      imageUrl: '/images/startup.jpeg'
    },
    {
      id: 4,
      title: 'Bhubaneswar Heritage Walk',
      date: '2025-09-01',
      description: 'Explore the ancient temples and historical sites of Bhubaneswar with an expert guide.',
      location: 'Lingaraj Temple Area',
      imageUrl: '/images/heritage-walk.jpg'
    }
  ]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const openAddEventModal = () => {
    setShowAddEventModal(true);
    setShowMobileMenu(false);
  };

  const closeAddEventModal = () => {
    setShowAddEventModal(false);
  };

  // Function to handle adding a new event
  const handleAddEvent = (newEventData) => {
    // Generate a unique ID for the new event
    // For simplicity, we'll use a timestamp or a basic counter.
    // In a real app, you might use a library like 'uuid' or get it from a backend.
    const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    const eventWithId = { ...newEventData, id: newId };

    // Update the events state. IMPORTANT: Always create a new array
    // when updating state that contains arrays/objects to ensure React re-renders.
    setEvents((prevEvents) => [...prevEvents, eventWithId]);

    closeAddEventModal(); // Close modal after adding
  };

  return (
    <div className="App">
      <Navbar
        onToggleMobileMenu={toggleMobileMenu}
        onOpenAddEventModal={openAddEventModal}
      />
      <HeroSection />
      <main>
        <EventList events={events} />
      </main>
      <Footer />

      {/* Mobile Menu Logic */}
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

      {/* Conditionally render the Add Event Modal */}
      {showAddEventModal && (
        <AddEventModal
          onClose={closeAddEventModal}
          onAddEvent={handleAddEvent} // Pass the handleAddEvent function down
        />
      )}
    </div>
  );
}

export default App;