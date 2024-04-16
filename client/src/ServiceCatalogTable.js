// ServiceCatalogTable.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const ServiceCatalogTable = ({ serviceCatalog, onEdit, onDelete, onSave, editEntry }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Service Name</TableCell>
            <TableCell align="right">Service Type</TableCell>
            <TableCell align="right">Price ($)</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceCatalog.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell component="th" scope="row">{entry.service.serviceName}</TableCell>
              <TableCell align="right">{entry.serviceType.serviceType}</TableCell>
              <TableCell align="right">
                {editEntry && editEntry._id === entry._id ? (
                  <TextField value={editEntry.price} onChange={e => onEdit({ ...editEntry, price: e.target.value })} type="number" />
                ) : (
                  `$${entry.price.toFixed(2)}`
                )}
              </TableCell>
              <TableCell align="right">
                {editEntry && editEntry._id === entry._id ? (
                  <TextField value={editEntry.description} onChange={e => onEdit({ ...editEntry, description: e.target.value })} fullWidth multiline />
                ) : (
                  entry.description
                )}
              </TableCell>
              <TableCell align="right">
                {editEntry && editEntry._id === entry._id ? (
                  <Button onClick={() => onSave(editEntry)} color="primary"><SaveIcon /> Save</Button>
                ) : (
                  <IconButton onClick={() => onEdit(entry)}><EditIcon /></IconButton>
                )}
                <IconButton onClick={() => onDelete(entry._id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceCatalogTable;
