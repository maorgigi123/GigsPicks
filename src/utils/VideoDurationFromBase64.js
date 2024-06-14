// src/utils/VideoDurationFromBase64.js

// Helper function to extract video duration from a base64 string
export const getVideoDurationFromBase64 = (base64) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      
      // Create a Blob from the base64 string and generate an object URL
      const blob = base64ToBlob(base64);
      const videoURL = URL.createObjectURL(blob);
  
      video.src = videoURL;
      video.preload = 'metadata'; // Ensure metadata is loaded
  
      // When the metadata is loaded, get the duration
      video.onloadedmetadata = () => {
        resolve(video.duration);
        URL.revokeObjectURL(videoURL); // Clean up the object URL
      };
  
      // Handle video loading error
      video.onerror = () => {
        reject('Error loading video');
      };
    });
  };
  
  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'video/mp4' }); // Adjust type if needed
  };
  