import React, { useState } from 'react';
import { storage } from '/firebase'; // Adjust the path as necessary
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import VR from './VR';

export default function Img() {
  const [VRImage, setVRImage] = useState(null);

  async function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log("Uploaded image URL:", url);
      setVRImage(url);
    }
  }

  return (
    <div>
      <label htmlFor="imageInput">Input Panoramic Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage} 
        id="imageInput"
        name="img"
      />
      {VRImage && (
        <div>
          <img src={VRImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
          <VR VRImage={VRImage} />
        </div>
      )}
    </div>
  );
}
