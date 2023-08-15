import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/bookingHistory.css';
import { useParams } from 'react-router-dom';
import ModalComponent from './modal';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from './auth'; // Import useAuth hook from auth.js

const BookingHistory = () => {
  const auth = useAuth();
  const { houseId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [cancelPopupVisible, setCancelPopupVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/booking/owner/house/${houseId}`)
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching booking history:', error));
  }, [houseId]);

  const handleCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setCancelPopupVisible(true);
  };

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      axios.delete(`http://localhost:8080/api/v1/booking/owner/delete/${bookingToCancel}`)
        .then(() => {
          // Refresh booking list after canceling
          setBookingToCancel(null);
          setCancelPopupVisible(false);
        })
        .catch(error => console.error('Error canceling booking:', error));
    }
  };

  const handleCancelPopup = () => {
    setBookingToCancel(null);
    setCancelPopupVisible(false);
  };

  return (
    <div className='booking-history'>
      <h2>Booking History</h2>
        {bookings.map(booking => (
          <Card key={booking[0]} className="booking-card">
          <Card.Body>
            <Card.Title>Booking no {booking[0]} details</Card.Title>
            <Card.Text>
              Booked by: {booking[1].name}
              Start-date: {booking[5]}
              End-date: {booking[6]}
              Booking-date: {booking[4]}
              Price: {booking[2]} USD
              Status: {booking[3]}
            </Card.Text>
                { booking[3] === 'ONGOING' &&
                  <Button variant="danger" onClick={() => handleCancelBooking(booking[0])}>
                    Cancel Booking
                  </Button>
                }
              </Card.Body>
            </Card>
        ))}
      {cancelPopupVisible && (
        <div className="popup">
          <ModalComponent handleClose={handleCancelPopup} show={cancelPopupVisible} 
          title="Cancel Booking" body="Are you sure?" handleConfirm={handleConfirmCancel}/>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;