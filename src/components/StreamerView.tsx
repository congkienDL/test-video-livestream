'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Video, VideoOff, Mic, MicOff, Users, Share2 } from 'lucide-react';

interface StreamerViewProps {
  onBack: () => void;
}

export default function StreamerView({ onBack }: StreamerViewProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamKey] = useState(() => Math.random().toString(36).substring(2, 15));
  const [streamTitle, setStreamTitle] = useState('My Live Stream');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  // Socket functionality disabled for build compatibility

  useEffect(() => {
    startCamera();

    // TODO: Re-enable socket functionality after build
    // Listen for viewer count updates
    // if (socket) {
    //   socket.on('viewer-count-update', (data) => {
    //     if (data.streamKey === streamKey) {
    //       setViewerCount(data.count);
    //     }
    //   });
    // }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      // if (socket) {
      //   socket.off('viewer-count-update');
      // }
    };
  }, [streamKey]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const toggleStream = () => {
    if (!isStreaming) {
      // Start streaming
      // TODO: Re-enable socket functionality
      // if (socket) {
      //   socket.emit('start-stream', {
      //     streamKey,
      //     title: streamTitle,
      //     streamer: 'Anonymous Streamer'
      //   });
      // }
      setIsStreaming(true);
      // Simulate viewer count for demo
      setViewerCount(Math.floor(Math.random() * 50) + 1);
    } else {
      // Stop streaming
      // if (socket) {
      //   socket.emit('stop-stream', streamKey);
      // }
      setIsStreaming(false);
      setViewerCount(0);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const copyStreamKey = () => {
    navigator.clipboard.writeText(streamKey);
    alert('Stream key copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>{viewerCount} viewers</span>
          </div>
          
          {isStreaming && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400">LIVE</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Video Preview */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-6">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full aspect-video object-cover"
          />
          
          {!isVideoEnabled && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={toggleStream}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
              isStreaming
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>{isStreaming ? 'Stop Stream' : 'Start Stream'}</span>
          </button>

          <button
            onClick={toggleVideo}
            className={`px-4 py-3 rounded-lg ${
              isVideoEnabled
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            onClick={toggleAudio}
            className={`px-4 py-3 rounded-lg ${
              isAudioEnabled
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
        </div>

        {/* Stream Info */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Stream Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stream Title
              </label>
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                disabled={isStreaming}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm disabled:opacity-50"
                placeholder="Enter your stream title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stream Key
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={streamKey}
                  readOnly
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={copyStreamKey}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm flex items-center space-x-1"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stream URL
              </label>
              <input
                type="text"
                value={typeof window !== 'undefined' ? `${window.location.origin}/watch/${streamKey}` : ''}
                readOnly
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
