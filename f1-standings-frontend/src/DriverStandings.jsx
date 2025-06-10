import React, { useEffect, useState } from 'react';

export default function DriverStandings() {
  const [standings, setStandings] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetch('/driver-standings.json')
      .then((res) => res.json())
      .then((data) => {
        setStandings(data.drivers);
        setLastUpdated(data.last_updated);
      });
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>F1 Driver Standings 2025</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((driver) => (
            <tr key={driver.driverStats}>
              <td>{driver.position}</td>
              <td>{driver.name}</td>
              <td>{driver.team}</td>
              <td>{driver.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16, color: '#888' }}>
        Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Loading...'}
      </div>
    </div>
  );
}
