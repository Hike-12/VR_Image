import React, { useEffect, useState } from 'react';

export default function VR({ VRImage }) {
  const [activeScene, setActiveScene] = useState(false);

  const openVRView = () => {
    setActiveScene(true); // Activate the scene
  };

  return (
    <div>
      {activeScene && (
        <a-scene embedded vr-mode-ui="enabled: false">
          <a-sky src={VRImage} rotation="0 -130 0"></a-sky>
          <a-entity
            camera
            look-controls="reverseMouseDrag: true"
            wasd-controls
            position="0 1.6 0"
          ></a-entity>
        </a-scene>
      )}
      <button
        onClick={openVRView}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        View in VR
      </button>
    </div>
  );
}