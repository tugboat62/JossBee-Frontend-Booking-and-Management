import React, { useState } from "react";
import { Button, Card, Collapse } from "react-bootstrap";
import axios from "axios";
import "../Styles/userHome.css";
import ModalComponent from "./modal";
import { useAuth } from "./auth"; // Import useAuth hook from auth.js
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

const UserHome = () => {
  const auth = useAuth();
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showMyHouses, setShowMyHouses] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [myHouses, setMyHouses] = useState([]);
  const [cancelPopupVisible, setCancelPopupVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const navigate = useNavigate();

  const fetchMyBookings = () => {
    axios
      .get(`http://localhost:8080/api/v1/booking/user/${auth.user}`)
      .then((response) => {
        setMyBookings(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMyHouses = () => {
    axios
      .get(`http://localhost:8080/api/v1/house/owner/${auth.user}`)
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
      axios
        .delete(
          `http://localhost:8080/api/v1/booking/user/delete/${bookingToCancel}`
        )
        .then(() => {
          // Refresh booking list after canceling
          setBookingToCancel(null);
          setCancelPopupVisible(false);
          fetchMyBookings();
        })
        .catch((error) => console.error("Error canceling booking:", error));
    }
  };

  const handleCancelPopup = () => {
    setBookingToCancel(null);
    setCancelPopupVisible(false);
  };

  const handleHouseDetails = (event) => {
    const item = event.target.getAttribute("item");
    navigate(`bookings/${item}`);
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-buttons-container">
        <Button
          variant="primary"
          className="home-buttons"
          onClick={handleToggleMyBookings}
        >
          {showMyBookings ? "Hide My Bookings" : "View My Bookings"}
        </Button>
        <Collapse in={showMyBookings} className="collapse-container">
          <div>
            {myBookings.map((booking) => (
              <Card key={booking[0]} className="booking-card">
                <Card.Body>
                  <Card.Title>{booking[1].name}</Card.Title>
                  <Card.Text>
                    Booking Date: {booking[4]}
                    <br />
                    Start Date: {booking[5]}
                    <br />
                    End Date: {booking[6]}
                    <br />
                    Rent Amount: {booking[3]}$<br />
                    Status: {booking[2]}
                    <br />
                    {/* Add more booking details as needed */}
                  </Card.Text>
                  {booking[2] === "ONGOING" && (
                    <Button
                      variant="danger"
                      onClick={() => handleCancelBooking(booking[0])}
                    >
                      Cancel Booking
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
            {cancelPopupVisible && (
              <div className="popup">
                <ModalComponent
                  handleClose={handleCancelPopup}
                  show={cancelPopupVisible}
                  title="Cancel Booking"
                  body="Are you sure?"
                  handleConfirm={handleConfirmCancel}
                />
              </div>
            )}
          </div>
        </Collapse>

        <Button
          variant="primary"
          className="home-buttons"
          onClick={handleToggleMyHouses}
        >
          {showMyHouses ? "Hide My Houses" : "View My Houses"}
        </Button>
        <Collapse in={showMyHouses} className="collapse-container">
          <div>
            {myHouses.map((house) => (
              <div>
                <Card key={house.houseId} className="house-card">
                  <Card.Body>
                    <Card.Title>{house.name}</Card.Title>
                    <Card.Text>
                      Address: {house.address}
                      <br />
                      Description: {house.description}
                      <br />
                      Rating: {house.rating}
                      <br />
                      <Button
                        variant="secondary"
                        item={house.houseId}
                        onClick={handleHouseDetails}
                      >
                        View Details
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default UserHome;
