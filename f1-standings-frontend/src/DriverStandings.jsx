import React, { useEffect, useState } from 'react';

// Utility to get a contrasting color (black or white) for a given hex color
function getContrastColor(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  // Parse r, g, b
  const r = parseInt(hex.substr(0,2),16);
  const g = parseInt(hex.substr(2,2),16);
  const b = parseInt(hex.substr(4,2),16);
  // Calculate luminance
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? '#222' : '#fff';
}

export default function DriverStandings() {
  const [standings, setStandings] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [hovered, setHovered] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://f1-live-pulse.p.rapidapi.com/driverStandings', {
          headers: {
            'x-rapidapi-host': 'f1-live-pulse.p.rapidapi.com',
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch driver standings');
        const data = await response.json();
        setStandings(data.drivers || []);
        setLastUpdated(data.last_updated || '');
      } catch (err) {
        setError('Could not load driver standings.');
      }
    };
    fetchData();
  }, []);

  // Find the max points for the progress bar
  const maxPoints = standings.length > 0 ? Math.max(...standings.map(d => d.points)) : 1;

  return (
    <div className="container" style={{ padding: 24 }}>
      <h1 className="title is-2 has-text-centered">F1 Driver Standings 2025</h1>
      {error && (
        <div className="notification is-danger is-light has-text-centered">{error}</div>
      )}
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
          {standings.map((driver) => {
            const contrastColor = getContrastColor(driver.color || '#000');
            return (
              <tr
                key={driver.driverStats}
                className={hovered === driver.driverStats ? 'is-selected' : ''}
                style={
                  hovered === driver.driverStats
                    ? { backgroundColor: contrastColor, color: driver.color, transition: 'background 0.2s' }
                    : undefined
                }
                onMouseEnter={() => setHovered(driver.driverStats)}
                onMouseLeave={() => setHovered(null)}
              >
                <td>{driver.position}</td>
                <td>
                  <span
                    className="tag"
                    style={{ backgroundColor: driver.color, color: '#fff', marginRight: 8 }}
                    title={driver.team}
                  >
                    {/* Color indicator */}
                    &nbsp;
                  </span>
                  <span style={{
                    display: 'inline-block',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#eee',
                    marginRight: 8,
                    verticalAlign: 'middle',
                    overflow: 'hidden',
                    textAlign: 'center',
                    lineHeight: '28px',
                    fontWeight: 600,
                    fontSize: 14,
                    color: driver.color
                  }}>
                    {driver.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                  {driver.name}
                </td>
                <td>{driver.team}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="tag is-primary" style={{ marginRight: 8 }}>{driver.points}</span>
                    <progress
                      className={`progress ${
                        driver.points / maxPoints >= 0.7 ? 'is-success' :
                        driver.points / maxPoints >= 0.5 ? 'is-warning' :
                        'is-danger'
                      }`}
                      value={driver.points}
                      max={maxPoints}
                      style={{ minWidth: 80, marginBottom: 0 }}
                    >
                      {driver.points}
                    </progress>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="has-text-grey has-text-right" style={{ marginTop: 16 }}>
        Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Loading...'}
      </div>
    </div>
  );
}
