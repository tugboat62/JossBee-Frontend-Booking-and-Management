import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "../Styles/houseDetails.css";
import BookingCard from "./bookingCard";
import { useAuth } from "./auth";

const HouseDetails = () => {
  const { houseId } = useParams();
  console.log(houseId);
  const [house, setHouse] = useState(null);
  const [reviews, setReviews] = useState([]);

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

    // Fetch reviews for the house from the backend API
    axios
      .get(`http://localhost:8080/api/v1/reviews/${houseId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [houseId]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="house-page">
      <div className="booking-card">
        <BookingCard houseId={house.houseId} capacity={house.capacity} price={house.price} />
      </div>
      <div className="house-details">
        <div className="house-top">
          <h2 className="house-title">{house.name}</h2>
          <img src={house.imageUrl} alt={house.title} />
        </div>
        <p>{house.description}</p>

        <div className="house-price">
          <h2>Price</h2>
          <p>${house.price} per night</p>
        </div>
        <div className="house-amenities">
          <h2>Amenities</h2>
          <ul>
            {house.amenities &&
              house.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
          </ul>
        </div>

        <div className="house-rating">
          <h2>Rating</h2>
          <div className="rating">
            <p>
              {house.rating} <FaStar color="orange" />
            </p>
          </div>
        </div>

        <div className="house-address">
          <h2>Address</h2>
          <p>{house.address}</p>
        </div>

        <div className="house-reviews">
          <h2>Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review[0]}>
                <h5 className="reviewer-name">{review[3].name}</h5>
                <p>{review[1]}</p>
                <div className="rating">
                  <p>
                    {review[2]} <FaStar color="orange" />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
