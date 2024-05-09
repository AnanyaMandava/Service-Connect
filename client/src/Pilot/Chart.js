import React from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function ChartComponent() {
  const [overview, setOverview] = React.useState({
    active: 0,
    upcoming: 0,
    completed: 0,
    total: 0
  });

  React.useEffect(() => {
    const serviceProviderId = localStorage.getItem('userId');
    console.log("userId:", serviceProviderId);
    axios.get(`${process.env.REACT_APP_F_URL}all/getallspbookings/${serviceProviderId}`).then((res) => {
      let active = 0;
      let upcoming = 0;
      let completed = 0;
      let total = 0;
      res.data.forEach((booking) => {
        total++;
        if (booking.status === "Ongoing") {
          active++;
        } else if (booking.status === "Upcoming") {
          upcoming++;
        } else if (booking.status === "Completed") {
          completed++;
        }
      });
      setOverview({ total, active, upcoming, completed });
    }).catch(error => {
      console.error('Error fetching booking data:', error);
    });
  }, []);

  const data = {
    labels: ['Total', 'Active', 'Upcoming', 'Completed'],
    datasets: [
      {
        label: 'Booking Status',
        data: [overview.total, overview.active, overview.upcoming, overview.completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <PolarArea data={data} style={{width:"200px",height:"250px"}}/>;
}
