import React from 'react';

function Selector({ id, data, onSelectionChange }) {
  const handleSelectChange = (key, value) => {
    onSelectionChange(id, key, value);
  };

  return (
    <div>
      {Object.keys(data).map((key) => (
        <div key={key} style={{ margin: '20px' }}>
          <label htmlFor={`${id}-${key}`} style={{ fontWeight: 'bold', marginRight: '10px' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <select
            id={`${id}-${key}`}
            name={key}
            style={{ padding: '10px', fontSize: '16px' }}
            onChange={(e) => handleSelectChange(key, e.target.value)}
          >
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
