import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { addWine, setResponse, setStatus } from './store/wineSlice';
import Selector from './components/Selector';
import WineList from './components/WineList';
import { useFetchWineData } from './useFetchWineData';
import WineViz from './components/WineViz';

function App() {
  const { data, loading, error } = useFetchWineData('http://localhost:5000/unique-wines');
  const [selections, setSelections] = useState({});
  const [numberSelection, setNumberSelection] = useState(10); // Default to 10
  const [resetTrigger, setResetTrigger] = useState(false); // Trigger for resetting dropdowns
  const dispatch = useDispatch();
  const store = useStore(); // Access the Redux store directly

  const handleSelectionChange = (id, key, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }));
  };

  const handleNumberChange = (e) => {
    setNumberSelection(Number(e.target.value));
  };

  const handleButtonClick = async () => {
    const payload = {
      selections,
      number: numberSelection,
    };


    dispatch(setStatus('loading'));
    try {
      const response = await fetch('http://127.0.0.1:5000/get_closest_wines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        dispatch(setStatus('failed'));
        return;
      }

      const responseData = await response.json();
      console.log( "responseData got " + responseData['data'].length)
      // console.log( JSON.stringify( responseData, null, 2 ) )
      dispatch(setResponse(responseData));
      dispatch(setStatus('succeeded'));
    } catch (error) {
      console.error('Error making POST request:', error);
      dispatch(setStatus('failed'));
    }
  };

  const handleClearButtonClick = () => {
    setSelections({});
    setNumberSelection(10);
    setResetTrigger((prev) => !prev); // Toggle reset trigger
    dispatch(setResponse(null)); // Clear the WineList
  };

  const logReduxStore = () => {
    // console.log("Redux Store State:", store.getState());
    const x = store.getState();
    const status=x['wine']['status'] 
    console.log("redux status=" + status )

    console.log("wine count=" + x['wine']['response']['data'].length ) 
    console.log(  x['wine']['response']['data'][0] )
 


  };

  const insertTestWine = () => { 
    const testWine = {similarity: 1.0, wine_id: 1000, wine_name: 'TEST'}    
    const x = store.getState();
    console.log("count count=" + x['wine']['response']['data'].length ) 
    console.log( testWine  )
    dispatch(addWine(testWine));
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h4>Wine Selection : Make sure https://github.com/mulefish/wine2 is running : <a href="https://github.com/mulefish/wine2_ui">wine2_ui repo</a></h4>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Selector Widget */}
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Selector
            id="A"
            data={data}
            onSelectionChange={handleSelectionChange}
            resetTrigger={resetTrigger}
          />
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="number-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
              Select a Number:
            </label>
            <select
              id="number-select"
              value={numberSelection}
              onChange={handleNumberChange}
              style={{ padding: '10px', fontSize: '16px' }}
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={100}>100</option>
            </select>
          </div>

          <button
            style={{
              marginTop: '20px',
              marginRight: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={handleButtonClick}
          >
            Get Wines
          </button>
          <button
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={handleClearButtonClick}
          >
            Clear
          </button>

          <button
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={logReduxStore}
          >
            Log Redux Store
          </button>

          
          <button
            style={{
              marginTop: '20px',
              marginRight: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={insertTestWine}
          >
          insertTestWine
          </button>


        </div>

        {/* Wine Visualization */}
        <div style={{ flex: '2' }}>
          <WineViz />
        </div>
      </div>

      <WineList />
    </div>
  );
}

export default App;
