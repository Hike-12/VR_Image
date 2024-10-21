import React, { useState } from 'react';
import { storage } from '/firebase'; 
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
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md">
      <label 
        htmlFor="imageInput" 
        className="mb-2 text-lg font-semibold text-gray-700"
      >
        Input Panoramic Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        id="imageInput"
        name="img"
        className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {VRImage && (
        <div className="flex flex-col items-center">
          <img 
            src={VRImage} 
            alt="Uploaded" 
            className="max-w-full h-auto rounded-md shadow-md mb-4"
          />
          <VR VRImage={VRImage} />
        </div>
      )}
    </div>
  );
  
}
