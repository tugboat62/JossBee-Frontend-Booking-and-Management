// BookingDetailsPage.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import HouseCard from "./houseCard";
import "../Styles/bookingDetails.css"; // Import your custom CSS for styling
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const [creditCard, setCreditCard] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const [house, setHouse] = useState(null);
  const { houseId } = useParams();

  useEffect(() => {
    // Fetch house details from the backend API
    axios
      .get(`http://localhost:8080/api/v1/house/${houseId}`)
      .then((response) => {
        setHouse(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [houseId]);

  const handleCreditCardChange = (e) => {
    setCreditCard(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleBillingAddressChange = (e) => {
    setBillingAddress(e.target.value);
  };

  const handleAgreeToRulesChange = () => {
    setAgreeToRules(!agreeToRules);
  };

  const handleConfirmAndPay = (e) => {
    e.preventDefault();
    if (creditCard && phoneNumber && billingAddress && agreeToRules) {
      // Implement your booking confirmation and payment logic here
      console.log("Booking confirmed and payment processed.");
    } else {
      // Display a warning or error message indicating missing fields
      console.log("Please fill in all required fields and agree to the rules.");
    }
  };

  return (
    <div className="booking-details-page">
      <div className="booking-form">
        <h2>Confirm and Pay</h2>
        <Form onSubmit={handleConfirmAndPay}>
          {/* Credit Card Details */}
          <Form.Group controlId="creditCard">
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control
              type="text"
              value={creditCard}
              onChange={handleCreditCardChange}
              required
            />
          </Form.Group>

          {/* Phone Number */}
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </Form.Group>

          {/* Billing Address */}
          <Form.Group controlId="billingAddress">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={billingAddress}
              onChange={handleBillingAddressChange}
              required
            />
          </Form.Group>

          {/* Agree to Rules */}
          <Form.Group controlId="agreeToRules">
            <Form.Check
              type="checkbox"
              label="I agree to the house rules"
              checked={agreeToRules}
              onChange={handleAgreeToRulesChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Confirm and Pay
          </Button>
        </Form>

      </div>
      
      {house && (
        <div className="house-details-card">
          {/* House Card */}
          <HouseCard house={house} />
        </div>
      )}

    </div>
  );
};

export default BookingDetails;
