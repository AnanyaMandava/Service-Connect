import React from 'react';
import { Box, Typography } from '@mui/material';
import './step3.css'; // Ensure this is the correct path to your CSS file

const Step3 = (props) => {
  const { providerSelected, dateRange } = props;

  // Format the dates
  const startDate = new Date(dateRange[0]).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
  const endDate = new Date(dateRange[1]).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  return (
    <div className="container">
      <Box className="service-container" mt={2} ml={5}>
        {/* Service details with shaded background */}
        <div className="service-details">
          <Typography variant="body1" className="details-text" color="text.secondary">
            {providerSelected.service.serviceName}
          </Typography>
          <Typography variant="body1" className="details-text" color="text.secondary">
            {providerSelected.serviceProvider.fullname}
          </Typography>
          <Typography variant="body1" className="details-text" color="text.secondary">
            {providerSelected.serviceType.serviceType}
          </Typography>
          <Typography variant="body1" className="details-text" color="text.secondary">
            {`${providerSelected.serviceProvider.address}, ${providerSelected.serviceProvider.city}, ${providerSelected.serviceProvider.state} ${providerSelected.serviceProvider.zipcode}`}
          </Typography>
          <Typography variant="body1" className="details-text" color="text.secondary">
            {providerSelected.serviceProvider.mobile}
          </Typography>
          <Typography variant="body1" className="details-text details-price" color="text.secondary">
            ${providerSelected.price} / per hour
          </Typography>
        </div>

        {/* Price and date/time details */}
        <div className="details-price-time">
          <Typography variant="body2" component="p" className="details-text"><strong>Start Date & Time:</strong> {startDate}</Typography>
          <Typography variant="body2" component="p" className="details-text"><strong>End Date & Time:</strong> {endDate}</Typography>
        </div>
      </Box>
    </div>
  );
};

export default Step3;
