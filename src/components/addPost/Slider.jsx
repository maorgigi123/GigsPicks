// Slider.jsx
import React from 'react';
import styled from 'styled-components';

const Slider = ({ frames, selectedFrame, onSelectFrame ,setCover,indexForCover}) => {
  return (
    <div style={{ display: 'flex',gap:'10px',width:'100%'}}>
      {frames.map((frame, index) => (
        <img
          key={index}
          src={frame}
          alt={`Frame ${index}`}
          loading="lazy"
          onClick={() => {onSelectFrame(index) 
            setCover((prevCover) => {
                const updatedCover = [...prevCover]; // Create a copy of the previous state array
                
                // Update the element at index `indexForCover` with `frameData`
                updatedCover[indexForCover] = frames[index];
                
                return updatedCover; // Return the updated array to update the state
              });
          }}
          style={{ cursor: 'pointer', width: '100px', height: 'auto', border: index === selectedFrame ? '2px solid blue' : 'none' }}
        />
      ))}
    </div>
  );
};

export default Slider;
