import React, { useRef, useEffect, useContext, useState } from 'react';
import { Video, VideoOff } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ThemeContext } from '../App';

interface VideoFeedProps {
  mode: 'sign-to-text' | 'text-to-sign';
}

const VideoFeed: React.FC<VideoFeedProps> = ({ mode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { darkMode } = useContext(ThemeContext);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null); // Store stream reference

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop(); // Stop each track
      });
      setStream(null); // Reset stream reference
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Clear video source
    }
    setIsVideoOn(false);
  };

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setStream(newStream);
      setIsVideoOn(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const toggleVideo = () => {
    if (isVideoOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    if (mode === 'sign-to-text') {
      startCamera();
    }

    return () => {
      stopCamera(); // Cleanup when mode changes or component unmounts
    };
  }, [mode]);

  if (mode === 'text-to-sign') {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 h-[500px]`}>
        <Canvas camera={{ position: [0, 1.5, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
        </Canvas>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-[400px] object-cover rounded-lg bg-gray-700"
        />
        <div className={`absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center space-x-2 ${isVideoOn ? "animate-pulse" : ""}`}>
          <button onClick={toggleVideo} className="text-sm">
            {isVideoOn ? <Video className="h-7 w-7 " /> : <VideoOff className="h-7 w-7" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
