// HouseCard.js

import React from 'react';
import { Card } from 'react-bootstrap';
import '../Styles/houseCard.css';

const HouseCard = ({ house }) => {
  return (
    <Card>
      <Card.Img className="house-image" variant="top" src={house.imageUrl} />
      <Card.Body>
        <Card.Title>{house.name}</Card.Title>
        <Card.Text>Rating: {house.rating}</Card.Text>
        <Card.Text>Price: ${house.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HouseCard;
