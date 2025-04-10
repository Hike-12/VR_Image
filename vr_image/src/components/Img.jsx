import React, { useState } from 'react';
import { storage } from '/firebase'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import VR from './VR';

export default function Img() {
  const [VRImage, setVRImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);
  const [apiError, setApiError] = useState('');

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

  async function generateImage() {
    if (!prompt.trim()) return;
    
    try {
      setIsGenerating(true);
      setApiError('');
      
      // Get API key and log its presence (not the actual key)
      const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      console.log("API Key present:", !!API_KEY);
      
      if (!API_KEY) {
        throw new Error("API key is missing. Check your .env file.");
      }
      
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      };
      
      console.log("Request headers set:", Object.keys(headers));
      
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            inputs: prompt + " 360-degree VR view high quality and make the viewing as if I was a third person standing there not too close, not too far",
          }),
        }
      );
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      const imageBlob = await response.blob();
      const fileName = `ai-generated-${Date.now()}.png`;
      const storageRef = ref(storage, `images/${fileName}`);
      
      await uploadBytes(storageRef, imageBlob);
      const url = await getDownloadURL(storageRef);
      
      setVRImage(url);
    } catch (error) {
      console.error("Error:", error);
      setApiError(error.message);
      alert("Failed to generate image: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
    <h1>Habibi</h1>
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="w-full mb-4">
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
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        
        <div className="mt-4">
          <button 
            onClick={() => setShowGenerator(!showGenerator)}
            className="text-blue-500 underline"
          >
            {showGenerator ? "Hide image generator" : "Or generate an image instead"}
          </button>
        </div>
      </div>

      {showGenerator && (
        <div className="w-full mt-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the panoramic scene you want to generate..."
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
            >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </button>
          {isGenerating && (
            <p className="mt-2 text-sm text-gray-600">
              This may take a minute or two...
            </p>
          )}
          {apiError && (
            <p className="mt-2 text-sm text-red-600">
              Error: {apiError}
            </p>
          )}
        </div>
      )}

      {VRImage && (
        <div className="flex flex-col items-center mt-6">
          <img 
            src={VRImage} 
            alt="VR Scene" 
            className="max-w-full h-auto rounded-md shadow-md mb-4"
            />
          <VR VRImage={VRImage} />
        </div>
      )}
    </div>
    </>
  );
}