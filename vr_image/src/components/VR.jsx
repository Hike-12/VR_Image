import React, { useEffect, useRef } from 'react';

export default function VR({ VRImage }) {
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
    </div>
  );
}

