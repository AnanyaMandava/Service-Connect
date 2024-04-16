import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

function DetailedBooking({ booking, closeDetailedBooking }) {
  const navigate = useNavigate();
  const [bookingStatus, setBookingStatus] = useState(booking.status);
  const [paymentStatus, setPaymentStatus] = useState(booking.paymentStatus);
  const [editMode, setEditMode] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSaveChanges = () => {
    axios.patch(`http://localhost:8080/agriDrone/updateBooking`, {
      bookingId: booking.bookingId,
      status: bookingStatus,
      paymentStatus: paymentStatus
    })
    .then(response => {
      setAlertMessage("Changes saved successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setEditMode(false);
      }, 2000);
    })
    .catch(error => {
      console.error("Failed to save changes:", error);
      setAlertMessage("Error saving changes!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    });
  };

  return (
    <div>
      {showAlert && <Alert severity="success">{alertMessage}</Alert>}
      <div>
        <Button onClick={closeDetailedBooking}>Return Back to Listing</Button>
      </div>
      <h3>Service {booking.bookingId}</h3>
      <p>Your total bill is below</p>
      <p>Summary</p>
      <p>Service Name: {booking.serviceName}</p>
      <p>Location: {booking.address}, {booking.city}, {booking.state}</p>
      {editMode ? (
        <>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={bookingStatus}
              label="Status"
              onChange={(e) => setBookingStatus(e.target.value)}
            >
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="payment-status-label">Payment Status</InputLabel>
            <Select
              labelId="payment-status-label"
              value={paymentStatus}
              label="Payment Status"
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
        </>
      ) : (
        <Button onClick={() => setEditMode(true)} color="secondary">Edit</Button>
      )}
      <Button onClick={() => navigate('/SP')}>Back to dashboard</Button>
    </div>
  );
}

export default DetailedBooking;
