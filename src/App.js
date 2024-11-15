import React, { useState } from 'react';

function App() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        <p>Select an option from the dropdown below:</p>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">-- Select an Option --</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        {selectedOption && (
          <p>
            You selected: <strong>{selectedOption}</strong>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
