// src/hooks/useEvents.js
import { useState, useEffect } from 'react';

const useEvents = () => {
  // Function to get initial events from localStorage or default
  const getInitialEvents = () => {
    try {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        return JSON.parse(storedEvents);
      }
    } catch (error) {
      console.error("Error parsing stored events from localStorage:", error);
      // Fallback to default events if parsing fails
    }
    // Default events if nothing in localStorage or an error occurred
    return [
      {
        id: 1,
        title: 'Community Clean-up Drive',
        date: '2025-07-25',
        description: 'Join us to clean up the beautiful Ekamra Kanan park. Gloves and bags provided. It will be a fun and rewarding day for everyone, helping to keep our city green and clean. Please bring water bottles.',
        location: 'Ekamra Kanan, Nayapalli',
        imageUrl: '/images/cleanup.jpg',
        category: 'Community'
      },
      {
        id: 2,
        title: 'Odia Language Workshop',
        date: '2025-08-10',
        description: 'A beginner-friendly workshop to learn basic conversational Odia phrases and cultural insights. Discover the richness of Odia language and its history. Materials will be provided.',
        location: 'Odisha State Museum',
        imageUrl: '/images/odia-workshop.png',
        category: 'Workshop'
      },
      {
        id: 3,
        title: 'Startup Pitch Competition',
        date: '2025-08-15',
        description: 'Watch budding entrepreneurs present their innovative ideas to a panel of investors and mentors. Network with industry leaders and find your next big idea. Refreshments will be served.',
        location: 'KIIT TBI',
        imageUrl: '/images/startup.jpeg',
        category: 'Tech & Business'
      },
      {
        id: 4,
        title: 'Bhubaneswar Heritage Walk',
        date: '2025-09-01',
        description: 'Explore the ancient temples and historical sites of Bhubaneswar with an expert guide. Learn about the rich history and architectural marvels of the city. Comfortable shoes are recommended.',
        location: 'Lingaraj Temple Area',
        imageUrl: '/images/heritage-walk.jpg',
        category: 'Culture & Heritage'
      },
      {
        id: 5,
        title: 'Old Town Festival 2024',
        date: '2024-11-20',
        description: 'A grand celebration of Bhubaneswar\'s rich heritage and culture with music, dance, and food from the old town area.',
        location: 'Old Town Area',
        imageUrl: '/images/festival.jpg',
        category: 'Culture & Heritage'
      },
      {
        id: 6,
        title: 'Bhubaneswar Marathon 2023',
        date: '2023-01-26',
        description: 'Annual marathon event promoting fitness and healthy living in Bhubaneswar.',
        location: 'Kalinga Stadium',
        imageUrl: '/images/marathon.jpg',
        category: 'Sports'
      }
    ];
  };

  const [events, setEvents] = useState(getInitialEvents);

  // Effect to save events to localStorage whenever 'events' state changes
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEventData) => {
    const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    const eventWithId = { ...newEventData, id: newId };
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
  };

  const deleteEvent = (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== idToDelete));
    }
  };

  const updateEvent = (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return {
    events,
    addEvent,
    deleteEvent,
    updateEvent,
  };
};

export default useEvents;