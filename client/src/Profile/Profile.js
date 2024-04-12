import React, { useEffect, useState } from "react";
import "./Profile.css";
import profileImage from "./../Assets/profile1.png";
import Fields from "./Fields";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:3001/all/userdetails/${userId}`)
        .then((res) => {
          setUserData(res.data.user);
          setUpdatedUserData(res.data.user); // Initialize updatedUserData with the current user data
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  const handleEditClick = () => {
    if (isEditable) {
      // When saving, ensure to destructure the address into its components
      const { address, city, state, zipcode, ...rest } = updatedUserData;
      const payload = {
        ...rest,
        address: updatedUserData.address,
        city: updatedUserData.city,
        state: updatedUserData.state,
        zipcode: updatedUserData.zipcode
      };

      axios.put(`http://localhost:3001/all/updateuser/${userData._id}`, payload)
        .then((res) => {
          setUserData(updatedUserData);
          setSnackbarSeverity("success");
          setSnackbarMessage("Profile updated successfully!");
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.error("Error updating user details:", error);
          setSnackbarSeverity("error");
          setSnackbarMessage("Failed to update profile!");
          setOpenSnackbar(true);
        });
    }
    setIsEditable(!isEditable);
  };

  const handleChange = (field) => (event) => {
    setUpdatedUserData({ ...updatedUserData, [field]: event.target.value });
  };

  return (
    <div className="container-fluid">
      <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Sets the Snackbar at the top middle
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

      <div className="row profile">
        <div className="col-sm-6 profile-column">
          <div className="row profile-heading">
            <h3>Profile</h3>
          </div>

          <div className="row image">
            <div className="col-sm-4">
              <img
                src={profileImage}
                alt="Profile"
                width="110px"
                height="120px"
              />
            </div>
            <div className="col-sm-8" style={{ paddingTop: "20px", textAlign: "left" }}>
              <div className="row">
                <h3 style={{ color: "#434343" }}>{userData?.fullname}</h3>
              </div>
              <div className="row">
                <h6 style={{ color: "#434343" }}>{userData?.mobile}</h6>
              </div>
            </div>
          </div>

          <Fields rowName="Email" rowValue={userData?.email} editable={false} />
          <Fields rowName="Phone" rowValue={updatedUserData?.mobile} editable={isEditable} onChange={handleChange('mobile')} />
          <Fields rowName="Fullname" rowValue={updatedUserData?.fullname} editable={isEditable} onChange={handleChange('fullname')} />
          <Fields rowName="Sex" rowValue={updatedUserData?.sex} editable={isEditable} onChange={handleChange('sex')} />
          {isEditable ? (
            <>
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                value={updatedUserData.address}
                onChange={handleChange('address')}
              />
              <TextField
                label="City"
                fullWidth
                margin="normal"
                value={updatedUserData.city}
                onChange={handleChange('city')}
              />
              <TextField
                label="State"
                fullWidth
                margin="normal"
                value={updatedUserData.state}
                onChange={handleChange('state')}
              />
              <TextField
                label="Zipcode"
                fullWidth
                margin="normal"
                value={updatedUserData.zipcode}
                onChange={handleChange('zipcode')}
              />
            </>
          ) : (
            <Fields rowName="Address" rowValue={`${userData?.address}, ${userData?.city}, ${userData?.state}, ${userData?.zipcode}`} editable={false} />
          )}
          <Fields rowName="Password" rowValue="*******" editable={false} />
          <Button variant="contained" color="primary" onClick={handleEditClick} style={{ marginTop: '20px' }}>
            {isEditable ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
