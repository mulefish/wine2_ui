import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const WineViz = () => {
  const response = useSelector((state) => state.wine.response); // Access wine data from Redux
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!response || response.status !== 'success' || !response.data.length) {
      // Display a message on the canvas if no data
      ctx.font = '20px Arial';
      ctx.fillStyle = '#888';
      ctx.fillText('No wine data to visualize', 50, 200);
      return;
    }

    // Canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Padding
    const padding = 50;

    // Find min and max similarity scores
    const scores = response.data.map((wine) => wine.similarity);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const scoreRange = maxScore - minScore || 1; // Handle edge case where all scores are identical

    // Add 10% buffer to min and max scores
    const adjustedMin = minScore - 0.1 * scoreRange;
    const adjustedMax = maxScore + 0.1 * scoreRange;
    const adjustedRange = adjustedMax - adjustedMin;

    // Calculate Y values for highest and lowest scores
    const highestY =
      canvasHeight -
      padding -
      ((maxScore - adjustedMin) / adjustedRange) * (canvasHeight - 2 * padding);
    const lowestY =
      canvasHeight -
      padding -
      ((minScore - adjustedMin) / adjustedRange) * (canvasHeight - 2 * padding);

    // Log the highest and lowest scores and their Y positions
    console.log('Highest Similarity:', maxScore, 'Y Position:', highestY);
    console.log('Lowest Similarity:', minScore, 'Y Position:', lowestY);

    // Draw X and Y axes
    ctx.beginPath();
    ctx.moveTo(padding, padding); // Y-axis
    ctx.lineTo(padding, canvasHeight - padding);
    ctx.moveTo(padding, canvasHeight - padding); // X-axis
    ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Axis labels
    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('X axis means nothing', canvasWidth / 2 - 60, canvasHeight - 20);

    // Draw markers for highest and lowest scores on the Y-axis
    ctx.fillStyle = 'green';
    ctx.fillText(`Highest: ${maxScore.toFixed(2)}`, padding - 45, highestY + 5); // Marker for highest
    ctx.fillStyle = 'red';
    ctx.fillText(`Lowest: ${minScore.toFixed(2)}`, padding - 45, lowestY + 5); // Marker for lowest

    // Plot each wine on the canvas
    response.data.forEach((wine) => {
      const { wine_name, similarity } = wine;

      // Normalize similarity score to canvas Y-coordinate
      const x = padding + Math.random() * (canvasWidth - 2 * padding); // Random X for spacing
      const y =
        canvasHeight -
        padding -
        ((similarity - adjustedMin) / adjustedRange) * (canvasHeight - 2 * padding); // Normalize

      // Draw the wine as a circle
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI); // Circle size = 5
      ctx.fillStyle = '#007BFF';
      ctx.fill();

      // Label the wine
      ctx.font = '12px Arial';
      ctx.fillStyle = '#333';
      ctx.fillText(wine_name + " " + similarity.toFixed(2), x + 10, y + 5); // Label beside the circle
    });
  }, [response]);

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #ccc' }}></canvas>;
};

export default WineViz;
