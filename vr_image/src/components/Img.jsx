import React, { useState, useRef } from 'react';
import { storage } from '/firebase'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import VR from './VR';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Img() {
  const [VRImage, setVRImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  async function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setVRImage(url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error(`Upload failed: ${error.message}`);
      }
    }
  }

  async function generateImage() {
    if (!prompt.trim()) return;
    
    try {
      setIsGenerating(true);
      setApiError('');
      
      // Get API key and log its presence (not the actual key)
      const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      
      if (!API_KEY) {
        throw new Error("API key is missing. Check your .env file.");
      }
      
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      };
      
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
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${response.statusText}`);
      }
      
      const imageBlob = await response.blob();
      const fileName = `ai-generated-${Date.now()}.png`;
      const storageRef = ref(storage, `images/${fileName}`);
      
      await uploadBytes(storageRef, imageBlob);
      const url = await getDownloadURL(storageRef);
      
      setVRImage(url);
      toast.success("Image generated successfully!");
    } catch (error) {
      setApiError(error.message);
      toast.error(`Failed to generate image: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setVRImage(url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error(`Upload failed: ${error.message}`);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto py-10"
    >
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl border border-white"
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      >
        <motion.div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
        
        <div className="p-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-8"
          >
            VR Experience
          </motion.h1>
          
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Upload 360 degree Image</h2>
              
              <motion.div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-white'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  id="imageInput"
                  name="img"
                  className="hidden"
                />
                
                <motion.div 
                  className="flex flex-col items-center justify-center"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="h-16 w-16 mb-4 text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-700">Drag & drop your image here</p>
                  <p className="text-sm text-gray-500 mt-1">- or -</p>
                  <p className="text-sm text-indigo-600 font-medium mt-1">Browse files</p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-4 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  onClick={() => setShowGenerator(!showGenerator)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition-colors"
                >
                  <span>{showGenerator ? "Hide image generator" : "Or generate an image with AI"}</span>
                  <motion.span
                    animate={{ rotate: showGenerator ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showGenerator ? 
                        <polyline points="18 15 12 9 6 15"></polyline> : 
                        <polyline points="6 9 12 15 18 9"></polyline>}
                    </svg>
                  </motion.span>
                </button>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {showGenerator && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">AI Image Generator</h2>
                    
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the panoramic scene you want to generate..."
                      className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-gray-700"
                    />
                    
                    <motion.button
                      onClick={generateImage}
                      disabled={isGenerating || !prompt.trim()}
                      className={`mt-3 px-6 py-3 rounded-lg w-full font-medium flex items-center justify-center ${
                        isGenerating || !prompt.trim() 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700'
                      } transition-all`}
                      whileHover={!isGenerating && prompt.trim() ? { scale: 1.03 } : {}}
                      whileTap={!isGenerating && prompt.trim() ? { scale: 0.98 } : {}}
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Generating...
                        </div>
                      ) : 'Generate VR Image'}
                    </motion.button>
                    
                    {isGenerating && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-center text-sm text-gray-500 italic"
                      >
                        Creating your VR masterpiece... This may take a minute or two
                      </motion.p>
                    )}
                    
                    <AnimatePresence>
                      {apiError && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <p className="text-sm text-red-600">
                            <span className="font-medium">Error:</span> {apiError}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {VRImage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="mt-8 flex flex-col items-center"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your VR Experience</h2>
                  
                  <motion.div 
                    className="relative w-full rounded-xl overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={VRImage} 
                      alt="VR Scene" 
                      className="w-full h-auto rounded-xl"
                    />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <VR VRImage={VRImage} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
