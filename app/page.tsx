'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StyleType = 'cinematic' | 'action' | 'aesthetic' | 'realistic';

interface StyleOption {
  id: StyleType;
  emoji: string;
  title: string;
  description: string;
  gradient: string;
  effects: string[];
}

const styles: StyleOption[] = [
  {
    id: 'cinematic',
    emoji: '🎥',
    title: 'Cinematic Hero',
    description: 'Dramatic hero-style cinematic edit with deep shadows, neon lights, and movie-grade color grading',
    gradient: 'from-purple-600 via-pink-600 to-red-600',
    effects: ['Deep shadows', 'Neon lights', 'Slow-motion feel', 'Movie-grade color', 'Crisp details']
  },
  {
    id: 'action',
    emoji: '⚡',
    title: 'Action Style',
    description: 'Intense action sequence with fast-paced motion clarity and sharp edges',
    gradient: 'from-orange-600 via-red-600 to-pink-600',
    effects: ['Motion clarity', 'Sharp edges', 'Darker tones', 'Punchy highlights', 'Shake stabilization']
  },
  {
    id: 'aesthetic',
    emoji: '🌈',
    title: 'Aesthetic Smooth',
    description: 'Modern aesthetic edit with soft pastel colors and dreamy glow',
    gradient: 'from-blue-400 via-purple-400 to-pink-400',
    effects: ['Soft pastels', 'Smooth transitions', 'Creamy highlights', 'Clean skin', 'Dreamy glow']
  },
  {
    id: 'realistic',
    emoji: '😎',
    title: 'Realistic AI Upgrade',
    description: 'Ultra-realistic enhancement with clean details and natural colors',
    gradient: 'from-green-600 via-teal-600 to-blue-600',
    effects: ['Clean skin details', 'Sharpened faces', 'Natural colors', 'Realistic lighting', '4K enhancement']
  }
];

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleTransform = async () => {
    if (!videoFile || !selectedStyle) return;

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Video Style Transformer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your videos with AI-powered cinematic effects and professional color grading
          </p>
        </motion.div>

        {/* Style Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {styles.map((style, index) => (
            <motion.button
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedStyle(style.id)}
              className={`relative p-6 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 overflow-hidden group ${
                selectedStyle === style.id
                  ? 'border-white shadow-2xl scale-105'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className="text-5xl mb-3">{style.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{style.description}</p>

                <div className="flex flex-wrap gap-2">
                  {style.effects.slice(0, 3).map((effect, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>

              {selectedStyle === style.id && (
                <motion.div
                  layoutId="selected-indicator"
                  className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Upload and Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-gray-700 p-8">
            {!videoFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-600 rounded-2xl p-16 text-center cursor-pointer hover:border-gray-400 transition-all duration-300 hover:bg-white/5"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <h3 className="text-2xl font-semibold mb-2">Upload Your Video</h3>
                <p className="text-gray-400 mb-4">Click to browse or drag and drop</p>
                <p className="text-sm text-gray-500">MP4, MOV, AVI up to 500MB</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-xl overflow-hidden bg-black">
                  {previewUrl && (
                    <video
                      src={previewUrl}
                      controls
                      className="w-full max-h-96 mx-auto"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{videoFile.name}</p>
                      <p className="text-sm text-gray-400">{(videoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setVideoFile(null);
                      setPreviewUrl(null);
                      setProgress(0);
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {isProcessing && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Processing...</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${styles.find(s => s.id === selectedStyle)?.gradient}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleTransform}
                  disabled={!selectedStyle || isProcessing}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    selectedStyle && !isProcessing
                      ? `bg-gradient-to-r ${styles.find(s => s.id === selectedStyle)?.gradient} hover:shadow-2xl hover:scale-105`
                      : 'bg-gray-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  {isProcessing
                    ? 'Transforming...'
                    : selectedStyle
                    ? `Transform with ${styles.find(s => s.id === selectedStyle)?.title}`
                    : 'Select a style to continue'}
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </motion.div>

        {/* Selected Style Details */}
        <AnimatePresence>
          {selectedStyle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto mt-8"
            >
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold mb-4">Effects Applied:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {styles.find(s => s.id === selectedStyle)?.effects.map((effect, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 rounded-lg bg-white/10 text-center text-sm"
                    >
                      {effect}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
