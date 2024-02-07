import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service details
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Service Id
              </div>
              <div className="col-sm-2 columnBillsub">{props.rowId}</div>
              {/* <img src={require("./../Assets/Line.svg").default}  style={{paddingTop:"5px"}}/> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Duration
              </div>
              <div className="col-sm-2 columnBillsub">2 Hrs</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Location
              </div>
              <div className="col-sm-2 columnBillsub">367 Old Toll Road, Mariposa, CA</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            
            
        </Box>
      </Modal>
    </div>
  );
}