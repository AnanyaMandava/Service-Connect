import React from 'react';
import TextField from '@mui/material/TextField';

function Fields({ rowName, rowValue, editable, onChange, multiFields }) {
  return (
    <div className="row detailsListing">
      <div className="col-sm">
        <p className="para">{rowName}</p>
      </div>
      <div className="col-sm">
        <p className="para">:</p>
      </div>
      <div className="col-sm">
        {editable ?
          (multiFields ? 
            multiFields.map((field, index) => (
              <TextField
                key={index}
                label={field.label}
                value={field.value}
                onChange={field.onChange}
                style={{ width: '100%', marginBottom: '8px' }}
              />
            )) :
            <TextField
              fullWidth
              value={rowValue}
              onChange={onChange}
            />
          ) :
          <p className="para">{rowValue}</p>
        }
      </div>
    </div>
  );
}

export default Fields;
