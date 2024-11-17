import React from 'react';
import { useSelector } from 'react-redux';

const WineList = () => {
  const response = useSelector((state) => state.wine.response);

  if (!response) {
    return <div>No data to display. Please make a selection and click "Log Selections".</div>;
  }

  if (response.status !== 'success') {
    return <div>Error: Unable to fetch wines. Try again later.</div>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recommended Wines</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {response.data.map((wine) => (
          <li
            key={wine.wine_id}
            style={{
              padding: '10px',
              margin: '5px 0',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <strong>{wine.wine_name}</strong> - Similarity: {wine.similarity.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WineList;
