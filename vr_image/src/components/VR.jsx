import React, { useEffect, useRef } from 'react';

export default function VR({ VRImage }) {
  return (
    <div>
      <a-scene embedded>
        <a-sky src={VRImage}></a-sky>
        <a-entity 
          camera 
          look-controls 
          wasd-controls 
          position="0 1.6 -5"
        ></a-entity>
      </a-scene>
    </div>
  );
}

