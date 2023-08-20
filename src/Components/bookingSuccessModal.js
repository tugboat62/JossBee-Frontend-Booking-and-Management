import React from 'react';
import { Modal, Button, Typography } from '@mui/material';
import '../Styles/bookingSuccessModal.css';

const BookingSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal open={show} onClose={handleClose}>
      <div className="success-modal">
        <div className="modal-content">
          <Typography variant="h5" gutterBottom>
            Booking Successful!
          </Typography>
          <Typography variant="body1">
            Your booking has been confirmed. Thank you!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingSuccessModal;
