import React, { useState } from "react";

// Component that fetches and displays delayed data
function SlowEndpointTest() {
    const [state, setState] = useState("idle"); // "idle" | "loading" | "success" | "error"
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchDelayedResponse = async () => {
        setState("loading"); // Set state to "loading"
        setError(null); // Reset error state
        setData(null); // Reset data state

        try {
            const response = await fetch("http://localhost:5000/delayed_response");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
            setState("success"); // Set state to "success"
        } catch (err) {
            setError(err.message);
            setState("error"); // Set state to "error"
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>Slow Endpoint Test</h1>
            <button
                onClick={fetchDelayedResponse}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Call Slow Endpoint
            </button>

            {/* State display */}
            <div style={{ marginTop: "20px" }}>
                {state === "idle" && <p>Click the button to call the endpoint.</p>}
                {state === "loading" && <p>Loading data from the server...</p>}
                {state === "success" && data && (
                    <div>
                        <h2>Response Data:</h2>
                        <p><strong>Message:</strong> {data.message}</p>
                        <p><strong>Delay:</strong> {data.delay_seconds} seconds</p>
                    </div>
                )}
                {state === "error" && error && (
                    <p style={{ color: "red" }}>Error: {error}</p>
                )}
            </div>
        </div>
    );
}

export default SlowEndpointTest;
