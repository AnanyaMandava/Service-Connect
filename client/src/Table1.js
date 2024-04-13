import React from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';

function BasicTable({ rows, search }) {
    const timeZone = 'America/Los_Angeles'; // PDT timezone

    const filteredRows = rows.filter((row) =>
        row.service.serviceName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <table>
            <thead>
                <tr>
                    <th>Service Name</th>
                    <th>Service Type</th>
                    <th>Service Provider</th>
                    <th>Booking Date</th>
                </tr>
            </thead>
            <tbody>
                {filteredRows.map((row) => (
                    <tr key={row._id}>
                        <td>{row.service.serviceName}</td>
                        <td>{row.serviceType.serviceType}</td>
                        <td>{row.serviceProvider.fullname}</td>
                        <td>{row.bookingDate.toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BasicTable;
