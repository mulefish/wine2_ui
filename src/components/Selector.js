import React, { useEffect, useState } from 'react';

function Selector({ id, data = {}, onSelectionChange, resetTrigger }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    // Reset the dropdowns when resetTrigger changes
    setSelectedOptions({});
  }, [resetTrigger]);

  const handleSelectChange = (key, value) => {
    const newSelection = { ...selectedOptions, [key]: value };
    setSelectedOptions(newSelection);
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
            value={selectedOptions[key] || ''} // Reset to default when options are cleared
          >
            <option value="" disabled>
              -- Select an Option --
            </option>
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
