import React, { useState } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import axios from 'axios';
import '../Styles/userHome.css';

const UserHome = ({ userId }) => {
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showMyHouses, setShowMyHouses] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [myHouses, setMyHouses] = useState([]);

  const fetchMyBookings = () => {
    axios.get(`http://localhost:8080/api/v1/booking/user/${userId}`)
      .then((response) => {
        setMyBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMyHouses = () => {
    axios.get(`http://localhost:8080/api/v1/house/owner/${userId}`)
      .then((response) => {
        setMyHouses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggleMyBookings = () => {
    setShowMyBookings(!showMyBookings);
    if (!showMyBookings) {
      fetchMyBookings();
    }
  };

  const handleToggleMyHouses = () => {
    setShowMyHouses(!showMyHouses);
    if (!showMyHouses) {
      fetchMyHouses();
    }
  };

  const handleDeleteBooking = (bookingId) => {
    axios.delete(`http://localhost:8080/api/v1/booking/user/delete/${bookingId}`)
      .then(() => {
        // Refresh the list after deleting a booking
        fetchMyBookings();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Home Page</h1>
      <Button variant="primary" className='home-buttons' onClick={handleToggleMyBookings}>
        {showMyBookings ? 'Hide My Bookings' : 'View My Bookings'}
      </Button>
      <Collapse in={showMyBookings}>
        <div>
          {myBookings.map((booking) => (
            <Card key={booking.bookingId} className="booking-card">
              <Card.Body>
                <Card.Title>{booking.house.name}</Card.Title>
                <Card.Text>
                  Booking Date: {booking.bookingDate}<br />
                  Start Date: {booking.startDate}<br />
                  End Date: {booking.endDate}<br />
                  Rent Amount: {booking.rentAmount}<br />
                  Status: {booking.status}<br />
                  {/* Add more booking details as needed */}
                </Card.Text>
                <Button variant="danger" onClick={() => handleDeleteBooking(booking.bookingId)}>
                  Cancel Booking
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Collapse>

      <Button variant="primary" className='home-buttons' onClick={handleToggleMyHouses}>
        {showMyHouses ? 'Hide My Houses' : 'View My Houses'}
      </Button>
      <Collapse in={showMyHouses}>
        <div>
          {myHouses.map((house) => (
            <Card key={house.houseId} className="house-card">
              <Card.Body>
                <Card.Title>{house.name}</Card.Title>
                <Card.Text>
                  Address: {house.address}<br />
                  Description: {house.description}<br />
                  {/* Add more house details as needed */}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default UserHome;
