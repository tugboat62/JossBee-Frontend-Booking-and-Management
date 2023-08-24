import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/bookingConfirmationModal.css';

const BookingConfirmationModal = ({ show, handleClose, totalAmount, onConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Total Amount: ${totalAmount}</p>
        <p>Are you sure you want to confirm this booking?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingConfirmationModal;