import React, { useState, useEffect } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import axios from 'axios';
import '../Styles/userHome.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ModalComponent from './modal';

const UserHome = ({ userId, setUserId }) => {
  // const { userId, setUserId } = useParams();
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showMyHouses, setShowMyHouses] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [myHouses, setMyHouses] = useState([]);
  const [cancelPopupVisible, setCancelPopupVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { setUserId(userId) },[]);

  const fetchMyBookings = () => {
    axios.get(`http://localhost:8080/api/v1/booking/user/${userId}`)
      .then((response) => {
        setMyBookings(response.data);
        console.log(response.data);
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

  const handleCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setCancelPopupVisible(true);
  };

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      axios.delete(`http://localhost:8080/api/v1/booking/user/delete/${bookingToCancel}`)
        .then(() => {
          // Refresh booking list after canceling
          setBookingToCancel(null);
          setCancelPopupVisible(false);
          fetchMyBookings();
        })
        .catch(error => console.error('Error canceling booking:', error));
    }
  };

  const handleCancelPopup = () => {
    setBookingToCancel(null);
    setCancelPopupVisible(false);
  };

  return (
    <div className="home-container">
      <Button variant="primary" className='home-buttons' onClick={handleToggleMyBookings}>
        {showMyBookings ? 'Hide My Bookings' : 'View My Bookings'}
      </Button>
      <Collapse in={showMyBookings}>
        <div>
          {myBookings.map((booking) => (
            <Card key={booking[0]} className="booking-card">
              <Card.Body>
                <Card.Title>{booking[1].name}</Card.Title>
                <Card.Text>
                  Booking Date: {booking[4]}<br />
                  Start Date: {booking[5]}<br />
                  End Date: {booking[6]}<br />
                  Rent Amount: {booking[2]}<br />
                  Status: {booking[3]}<br />
                  {/* Add more booking details as needed */}
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
      </Collapse>

      <Button variant="primary" className='home-buttons' onClick={handleToggleMyHouses}>
        {showMyHouses ? 'Hide My Houses' : 'View My Houses'}
      </Button>
      <Collapse in={showMyHouses}>
        <div>
          {myHouses.map((house) => (
            <div>
              <Card key={house.houseId} className="house-card">
                <Card.Body>
                  <Card.Title>{house.name}</Card.Title>
                  <Card.Text>
                    Address: {house.address}<br />
                    Description: {house.description}<br />
                    Rating: {house.rating}<br />
                    <Card.Link href={`/owner/bookings/${house.houseId}`}>View booking history</Card.Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default UserHome;
