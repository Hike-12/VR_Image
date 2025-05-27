# VR Image Generator

A modern web application that allows users to upload 360-degree images or generate them using AI, then view them in an immersive VR experience directly in the browser.

## 🌟 Features

- **360° Image Upload**: Drag & drop or browse to upload panoramic images
- **AI Image Generation**: Generate custom VR scenes using Hugging Face's Stable Diffusion XL
- **Web VR Experience**: View images in an immersive VR environment with mouse/touch controls
- **Firebase Integration**: Secure cloud storage for all uploaded and generated images
- **Responsive Design**: Beautiful, mobile-friendly interface with smooth animations
- **Real-time Feedback**: Toast notifications and loading states for better UX

## 🚀 Live Demo

Visit the live application: [VR Image Generator](https://your-username.github.io/VR_Image)

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **VR Framework**: A-Frame 1.2.0
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Cloud Storage**: Firebase Storage
- **AI Integration**: Hugging Face Inference API (Stable Diffusion XL)
- **Deployment**: GitHub Pages
- **Notifications**: React Toastify

## 📦 Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/VR_Image.git
    cd VR_Image
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the vr_image directory:
    ```env
    VITE_HUGGINGFACE_API_KEY=your_hugging_face_api_key_here
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

4. **Configure Firebase**

    Update the Firebase configuration in `firebase.js` with your project credentials.

5. **Start the development server**
    ```bash
    npm run dev
    ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firebase Storage
3. Update the configuration in `firebase.js`:

    ```javascript
    // firebase.js
    import { initializeApp } from 'firebase/app';
    import { getStorage } from 'firebase/storage';

    const firebaseConfig = {
      // Your config here
    };

    const app = initializeApp(firebaseConfig);
    export const storage = getStorage(app);
    ```

### Hugging Face API
1. Sign up at [Hugging Face](https://huggingface.co/)
2. Get your API token from your profile settings
3. Add it to your `.env` file as `VITE_HUGGINGFACE_API_KEY`

## 🎮 Usage

### Uploading Images
- **Drag & Drop**: Simply drag a 360° image onto the upload area
- **Browse Files**: Click the upload area to open file browser
- **Supported Formats**: JPG, PNG, WebP, and other common image formats

### Generating AI Images
1. Click "Or generate an image with AI"
2. Enter a descriptive prompt for your desired scene
3. Click "Generate VR Image"
4. Wait for the AI to create your custom panoramic image

### VR Experience
- Click "View in VR" to enter the immersive experience
- **Mouse Controls**: Drag to look around
- **Mobile**: Touch and drag to navigate
- **Exit**: Use the "Exit VR View" button to return

## 📁 Project Structure

```
VR_Image/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Upload.jsx
│   │   ├── VR.jsx
│   │   └── AIGenerator.jsx
│   ├── utils/
│   │   └── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Deployment

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Manual Deployment
1. **Build the project**
    ```bash
    npm run build
    ```

2. **Deploy to GitHub Pages**
    ```bash
    npm run deploy
    ```

### Automatic Deployment
Push to the `main` branch to trigger automatic deployment via GitHub Actions.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. Customize the design by modifying:
- `tailwind.config.js` - Tailwind configuration
- Component classes - Direct Tailwind class modifications

### VR Settings
Modify VR behavior in `VR.jsx`:
- Camera position and controls
- Scene lighting and environment
- Navigation settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- VR mode may automatically trigger on mobile devices - this is intended A-Frame behavior
- Large images may take time to load in VR mode
- AI generation requires stable internet connection

## 🆘 Support

If you encounter any issues or have questions:
- Check the [Issues](https://github.com/your-username/VR_Image/issues) page
- Create a new issue with detailed description
- Include browser and device information for VR-related issues

## 🙏 Acknowledgments

- [A-Frame](https://aframe.io/) for the VR framework
- [Hugging Face](https://huggingface.co/) for AI image generation
- [Firebase](https://firebase.google.com/) for cloud storage
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
