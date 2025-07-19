// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import './Notification.css';

function Notification({ message, type, duration = 3000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer); // Cleanup timeout if component unmounts or message changes
    } else {
      setVisible(false);
    }
  }, [message, duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}

export default Notification;