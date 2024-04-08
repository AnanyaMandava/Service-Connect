import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem
import './SignUp.css';

function SignUp(props) {
    const [state, setState] = useState('');

    const handleChangeState = (event) => {
      setState(event.target.value);
    };

    const SaveData = () => {
        // Sending this page details to prev page
        props.sendSignUpToDb(
            createData(
                document.getElementById("address").value,
                document.getElementById("city").value,
                state,
                document.getElementById("zipcode").value
            )
        );
    };

    const statesEnum = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

    function createData(address, city, state, zipcode) {
        return { address, city, state, zipcode };
    }

    return (
        <div className="farmProfilePage container-fluid" style={{ backgroundColor: "white" }}>
            <div className="row" style={{ marginTop: "20px" }}>
                <h3 style={{ color: "#1A3447", textAlign: "left" }}>Please provide additional details</h3>
            </div>
            <div className="row row-farmProfile">
                <div className="col-sm" style={{ padding: "20px" }}>
                    <div className="row innerrow"> Additional Details</div>
                    <div className="row innerrow">
                        <TextField
                            required
                            id="address"
                            helperText="Please enter your address"
                            label="Address"
                            defaultValue=""
                        />
                    </div>
                    <div className="row innerrow">
                        <TextField
                            required
                            id="city"
                            label="City"
                            defaultValue=""
                        />
                    </div>
                    <div className="row innerrow">
                        <div className="col-sm">
                            {/* Dropdown for State */}
                            <TextField
                                required
                                id="state"
                                select // Set as a select dropdown
                                label="State"
                                defaultValue=""
                                className="state-dropdown"
                                value={state}
                                onChange={handleChangeState}
                            >
                                {statesEnum.map((state) => (
                                    <MenuItem key={state} value={state}>{state}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-sm">
                            <TextField
                                required
                                id="zipcode"
                                label="Zip Code"
                                defaultValue=""
                            />
                        </div>
                    </div>
                    <div className="row innerrow" style={{ justifyContent: "center" }}></div>
                </div>
                <div className="row innerrow" style={{ justifyContent: "center" }}>
                    <button className="farmProfileButton-Save" onClick={() => { SaveData() }}> Save</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
