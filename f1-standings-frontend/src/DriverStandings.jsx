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
    <div className="container" style={{ padding: 24 }}>
      <h1 className="title is-2 has-text-centered">F1 Driver Standings 2025</h1>
      <table className="table is-striped is-hoverable is-fullwidth">
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
      <div className="has-text-grey has-text-right" style={{ marginTop: 16 }}>
        Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Loading...'}
      </div>
    </div>
  );
}
