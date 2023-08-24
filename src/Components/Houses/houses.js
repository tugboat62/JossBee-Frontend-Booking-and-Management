import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/houses.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [houses, setHouses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch house data from the backend API
    axios.get('http://localhost:8080/api/v1/house')
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleHouseClick = (houseId) => {
    // Redirect to the house details page when the card is clicked
    navigate(`/house/${houseId}`);    
  };

  return (
    <div className="home">
      <div className="house-cards">
        {houses.map((house) => (
          <div key={house.houseId} onClick={() => handleHouseClick(house.houseId)} className="house-card">
            <img src={house.imageUrl} alt={house.name} />
            <h2>{house.name}</h2>
            <p>{house.description}</p>
            <p>{house.address}</p>
            <p>Price: {house.price} USD per night</p>
            <p>Rating: {house.rating} / 5</p>
            <p>Amenities: {house.amenities}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
