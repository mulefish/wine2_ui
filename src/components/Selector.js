import React from 'react';

function Selector({ data }) {
  return (
    <div>
      {Object.keys(data).map((key) => (
        <div key={key} style={{ margin: '20px' }}>
          <label htmlFor={key} style={{ fontWeight: 'bold', marginRight: '10px' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <select id={key} name={key} style={{ padding: '10px', fontSize: '16px' }}>
            <option value="">-- Select an option --</option>
            {data[key].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default Selector;
