import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/notifications.css';
import { Button, Card } from 'react-bootstrap';
import ModalComponent from './modal';
import { useAuth } from './auth'; // Import useAuth hook from auth.js
import '../Styles/notifications.css';

const Notifications = () => {
  const auth = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchNotifications();
  });

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/profile/${auth.user}/notifications`);
      const notificationsData = response.data[0] || []; // Assuming notifications are in the first list
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleDeleteNotification = (notificationId) => {
    setNotificationToDelete(notificationId);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (notificationToDelete !== null) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/profile/notifications/delete/${auth.user}/${notificationToDelete}`);
        setNotificationToDelete(null);
        setShowPopup(false);
        fetchNotifications(); // Refresh notifications after delete
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setNotificationToDelete(null);
    setShowPopup(false);
  };

  return (
    <div className='notifications-container'>
      <ul>
        {notifications.map((notification, index) => (
          <Card key={index} className="notification-card">
            <Card.Body>
                <Card.Title> </Card.Title>
                <Card.Text>
                {notification}
                </Card.Text>
                <Button variant="danger" onClick={() => handleDeleteNotification(index)}>
                Delete
                </Button>       
            </Card.Body>
          </Card>
        ))}
      </ul>
      {showPopup && (
        <div className="popup">
            <ModalComponent handleClose={handleCancelDelete} show={showPopup} 
            title="Delete notification" body="Are you sure?" handleConfirm={handleConfirmDelete}/>
        </div>
      )}
    </div>
  );
};

export default Notifications;
