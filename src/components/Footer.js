// src/components/Footer.js
import React from 'react';
import './Footer.css'; // You can add a CSS file for this component later

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Bhubaneswar Connect. All rights reserved.</p>
      {/* You can add links here later, e.g., Privacy Policy, Terms */}
    </footer>
  );
}

export default Footer;