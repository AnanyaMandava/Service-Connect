import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Schedule() {
  const navigate = useNavigate();
  const [bookingEvents, setBookingEvents] = useState([]);

  
  const renderEventContent = (booking) => {
    return (
      <div>
        <strong>{booking.title}</strong> {/* Display the title */}
        <p>{booking.user.fullname}</p> {/* Display the custom 'Customer' field */}
        {/* You can add more details here */}
      </div>
    );
  };


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const serviceProviderId = localStorage.getItem('userId'); 
        console.log('spId:', serviceProviderId);       
        const response = await axios.get(`http://localhost:3001/all/getcustbookings/${serviceProviderId}`);
        
        // Log the response to check if it's as expected
        console.log('Fetched Bookings:', response.data);

        // Assuming the response.data contains an array of booking events

        const formattedEvents = response.data.map(booking => {
          return {
            id: booking._id, // Assuming there's an _id field
            start: new Date(booking.bookingDate), // Assuming the date is in a compatible format
            end: new Date(new Date(booking.bookingDate).getTime() + 60 * 60 * 1000), // Example: adds 1 hour to start
            title: booking.service.serviceName,
            Customer: booking.user.fullname, // Assuming nested serviceName under service
            bgColor: '#f0f0f0' // Example background color
          };
        });

        console.log("FormattedEvents:", formattedEvents);
        setBookingEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className='row' style={{backgroundColor:"white"}}>
      <div className='col-sm' style={{width:"800px"}}>
        <Scheduler events={bookingEvents} editable={false} eventContent={renderEventContent}/>
      </div>
      <div className='row'>
        <button onClick={() => navigate('/Pilot')} className="buttonPayment">Back to dashboard</button>
      </div>
    </div>
  );
}
