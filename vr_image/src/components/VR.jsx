import React, { useEffect, useRef } from 'react';

export default function VR({ VRImage }) {

  const [isVRReady, setIsVRReady] = React.useState(false);
  const [activeScene, setActiveScene] = React.useState(false);

  const openVRView = () => {
    setActiveScene(true);
    setTimeout(() => {
      const scene = document.querySelector('a-scene');
      if (scene && scene.is('vr-mode') === false) {
        scene.enterVR();
      }
    }, 300);
  };

  useEffect(() => {
    if (activeScene) {
      // Make sure A-Frame has time to initialize
      const timer = setTimeout(() => {
        // Force A-Frame to recognize the scene 
        if (window.AFRAME) {
          if (document.querySelector('a-scene').hasLoaded) {
            setIsVRReady(true);
          } else {
            document.querySelector('a-scene').addEventListener('loaded', function() {
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
  return (
    <div>
      <a-scene embedded
      vr-mode-ui="enabled: true">
        <a-sky src={VRImage} rotation="0 -130 0"></a-sky>
        <a-entity 
          camera 
          look-controls="reverseMouseDrag: true" 
          wasd-controls 
          position="0 1.6 0"
        ></a-entity>
      </a-scene>
      <button 
      onClick={openVRView}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
      View in VR
      </button>
    </div>
  );
}

