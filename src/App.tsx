import React, { useState, createContext, useContext } from 'react';
import { Camera, Volume2, MessageSquare, ArrowLeftRight, Settings, User, UserCog, Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import VideoFeed from './components/VideoFeed';
import ConversionPanel from './components/ConversionPanel';
import AudioPanel from './components/AudioPanel';

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

function App() {
  const [activeMode, setActiveMode] = useState<'sign-to-text' | 'text-to-sign'>('sign-to-text');
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full p-2 shadow-md`}>
              <button
                onClick={() => setActiveMode('sign-to-text')}
                className={`px-6 py-3 rounded-full transition-all ${
                  activeMode === 'sign-to-text'
                    ? 'bg-blue-500 text-white'
                    : `${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                }`}
              >
                Sign to Text
              </button>
              <button
                onClick={() => setActiveMode('text-to-sign')}
                className={`px-6 py-3 rounded-full transition-all ${
                  activeMode === 'text-to-sign'
                    ? 'bg-blue-500 text-white'
                    : `${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                }`}
              >
                Text to Sign
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-40">
            <VideoFeed mode={activeMode} />
            <ConversionPanel mode={activeMode} />
          </div>

          {/* <AudioPanel /> */}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;