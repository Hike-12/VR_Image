import React, { useEffect, useState } from 'react';

export default function VR({ VRImage }) {
  const [isVRReady, setIsVRReady] = useState(false);
  const [activeScene, setActiveScene] = useState(false);

  // Handle VR initialization
  useEffect(() => {
    if (activeScene) {
      const timer = setTimeout(() => {
        if (window.AFRAME) {
          const scene = document.querySelector('a-scene');
          if (scene.hasLoaded) {
            setIsVRReady(true);
          } else {
            scene.addEventListener('loaded', function() {
              setIsVRReady(true);
            });
          }
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setIsVRReady(false);
    }
  }, [activeScene]);

  const openVRView = () => {
    setActiveScene(true);
  };

  const closeVRView = () => {
    setActiveScene(false);
  };

  return (
    <div className="relative">
      {!activeScene ? (
        <div className="text-center">
          <div 
            className="h-48 bg-cover bg-center cursor-pointer relative mb-4"
            style={{ backgroundImage: `url(${VRImage})` }}
            onClick={openVRView}
          >
            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              360° View
            </div>
          </div>
          <button 
            onClick={openVRView}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            View in VR
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 z-50">
          <a-scene embedded vr-mode-ui="enabled: true">
            <a-assets>
              <img id="skyTexture" src={VRImage} />
            </a-assets>
            <a-sky src="#skyTexture" rotation="0 -130 0"></a-sky>
            <a-entity 
              camera 
              position="0 1.6 0" 
              look-controls="reverseMouseDrag: true" 
              wasd-controls
            ></a-entity>
          </a-scene>
          
          <button 
            onClick={closeVRView}
            className="absolute top-5 right-5 bg-black bg-opacity-70 text-white font-bold py-2 px-4 rounded z-50 hover:bg-opacity-90 transition-colors"
          >
            Exit VR View
          </button>
        </div>
      )}
    </div>
  );
}