import React, { Component } from 'react';
import './Profile.css'
function Field(props) {
    return <>
    
    <div className="row detailsListing">
                <div className="col-sm">
                    <p className="para">{props.rowName}</p>
                </div>
                <div className="col-sm">
                    <p className="para">:</p>
                </div>
                <div className="col-sm">
                    <p className="para">{props.rowValue}</p>
                </div>
            </div>
            </>;
}

export default Field;