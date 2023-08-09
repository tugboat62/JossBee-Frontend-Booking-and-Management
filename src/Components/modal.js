import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalComponent(props) {
    const { show, handleClose, handleConfirm, title, body } = props;
    console.log(props);
    
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
            <Button variant="dark" onClick={handleConfirm}>
                Confirm
            </Button>
        </Modal.Footer>
        </Modal>
    );


}