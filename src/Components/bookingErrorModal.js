import React from 'react';
import { Modal, Button, Typography } from '@mui/material';
import '../Styles/bookingErrorModal.css';

const BookingErrorModal = ({ show, handleClose, message }) => {
    return (
      <Modal open={show} onClose={handleClose}>
        <div className="error-modal">
          <div className="modal-content">
            <Typography variant="h5" gutterBottom>
              Booking Error
            </Typography>
            <Typography variant="body1">
              {message}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
  };
  
  export default BookingErrorModal;
