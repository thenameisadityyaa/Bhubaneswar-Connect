// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

// Navbar now accepts two props: onToggleMobileMenu and onOpenAddEventModal
function Navbar({ onToggleMobileMenu, onOpenAddEventModal }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Bhubaneswar Connect</div>
      {/* Call onOpenAddEventModal when the desktop button is clicked */}
      <button className="navbar-add-event" onClick={onOpenAddEventModal}>Add Event</button>
      <button className="hamburger-menu" onClick={onToggleMobileMenu}>☰</button>
    </nav>
  );
}

export default Navbar;