// VideoPlayer.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImagesContainer = styled.div`
display: flex;
width: 100%;
`;
const VideoPlayer = ({ videoSrc, onFrameCapture,duration,setLoadCover }) => {
  const [frames, setFrames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFrames = async () => {
      try {

        const frameCount = Math.ceil(duration) > 15 ? 15 : Math.ceil(duration); // Number of frames to capture
        const capturedFrames = [];

        for (let i = 1; i <= frameCount; i++) {
          const frameTime = i;
          const frameData = await generateVideoThumbnail(videoSrc, frameTime);
          capturedFrames.push(frameData); // Store each frame thumbnail
          onFrameCapture(frameData)
        }

      } catch (error) {
        setError(error.toString());
      }
    };

    if (videoSrc) {
      fetchFrames();
    }
  }, [videoSrc]);

  // Callback function to handle frame selection
  const handleFrameSelect = (index) => {
    const selectedFrame = frames[index];
    onFrameCapture(selectedFrame); // Pass selected frame to parent component
  };

  // Function to generate a thumbnail from a video
  const generateVideoThumbnail = async (videoSrc,frame) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.crossOrigin = "anonymous"; // Ensure the video can be used for canvas operations

      video.onloadeddata = () => {
        // Set the time to capture the frame
        video.currentTime = frame; // Capture a frame at 1 second into the video
      };

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/png');
        resolve(thumbnail,video);
      };

      video.onerror = (error) => {
        reject('Error loading video');
      };
    });
  };
};

export default VideoPlayer;
