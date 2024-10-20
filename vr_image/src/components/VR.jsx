import React, { useEffect, useRef } from 'react';

export default function VR({ VRImage }) {
  return (
    <div>
      <a-scene embedded>
        <a-sky src={VRImage}></a-sky>
        <a-box position="0 1 -5" color="red"></a-box>
        <a-entity camera look-controls wasd-controls></a-entity>
      </a-scene>
    </div>
  );
}
