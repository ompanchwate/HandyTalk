import React, { useState, useContext, useEffect, useRef } from 'react';
import { Volume2, Send, Mic, Square } from 'lucide-react';
import { ThemeContext } from '../App';

interface ConversionPanelProps {
  mode: 'sign-to-text' | 'text-to-sign';
}

const ConversionPanel: React.FC<ConversionPanelProps> = ({ mode }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const { darkMode } = useContext(ThemeContext);
  // const recognitionRef = useRef<SpeechRecognition | null>(null);

  // useEffect(() => {
  //   if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  //     recognitionRef.current = new SpeechRecognition();
  //     recognitionRef.current.continuous = false; // Stop after one phrase
  //     recognitionRef.current.interimResults = false;

  //     recognitionRef.current.onresult = (event) => {
  //       let finalTranscript = '';
  //       for (let i = event.resultIndex; i < event.results.length; i++) {
  //         finalTranscript += event.results[i][0].transcript + ' ';
  //       }
  //       setRecognizedText(prev => prev + finalTranscript);
  //     };

  //     recognitionRef.current.onerror = (event) => {
  //       console.error('Speech recognition error:', event.error);
  //       setIsRecording(false);
  //     };

  //     recognitionRef.current.onend = () => {
  //       setIsRecording(false);
  //     };
  //   }

  //   return () => {
  //     if (recognitionRef.current) {
  //       recognitionRef.current.stop();
  //     }
  //   };
  // }, []);

  // const toggleRecording = () => {
  //   if (!recognitionRef.current) return;

  //   if (isRecording) {
  //     recognitionRef.current.stop();
  //     setIsRecording(false);
  //   } else {
  //     recognitionRef.current.start();
  //     setIsRecording(true);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Converting:', inputText);
  };

  if (mode === 'sign-to-text') {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 h-[500px]`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Converted Text</h2>
          {/* <button
            onClick={toggleRecording}
            className={`p-2 rounded-full ${
              isRecording 
                ? 'bg-red-100 text-red-500 hover:bg-red-200'
                : 'bg-blue-100 text-blue-500 hover:bg-blue-200'
            }`}
          >
            {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button> */}
        </div>
        <div className={`h-[400px] ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 overflow-hidden`}>
          <textarea
            value={recognizedText}
            onChange={(e) => setRecognizedText(e.target.value)}
            className={`w-full h-full resize-none overflow-hidden border-none focus:ring-0 p-3 outline-none ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
            }`}
            placeholder="Speak or use sign language to see the interpretation here..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 h-[500px]`}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Enter Text</h2>
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          className={`flex-1 p-4 rounded-lg ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
              : 'bg-white text-gray-800 border-gray-200 focus:border-blue-500'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
        />
        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } flex items-center space-x-2`}
          >
            <Volume2 className="h-5 w-5" />
            <span>Speak</span>
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Convert</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConversionPanel;
