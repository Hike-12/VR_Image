import React, { useEffect, useRef } from 'react';

export default function VR({ VRImage }) {
  return (
    <div>
      <a-scene embedded>
        <a-sky src={VRImage}></a-sky>
        <a-entity camera look-controls wasd-controls></a-entity>
      </a-scene>
    </div>
  );
}
