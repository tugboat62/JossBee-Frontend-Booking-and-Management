import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/houseDetails.css';

const HouseDetails = () => {
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch house details from the backend API
    axios.get(`/api/houses/${houseId}`)
      .then((response) => {
        setHouse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch reviews for the house from the backend API
    axios.get(`/api/reviews/${houseId}`)
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
    <div className="house-details">
      <h2>{house.name}</h2>
      {/* Display house details */}
      {/* Display reviews */}
    </div>
  );
};

export default HouseDetails;
