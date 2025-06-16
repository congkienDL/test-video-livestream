'use client';

import { useState } from 'react';
import StreamerView from '@/components/StreamerView';
import ViewerView from '@/components/ViewerView';
import { Video, Users } from 'lucide-react';

export default function Home() {
  const [mode, setMode] = useState<'select' | 'streamer' | 'viewer'>('select');

  if (mode === 'streamer') {
    return <StreamerView onBack={() => setMode('select')} />;
  }

  if (mode === 'viewer') {
    return <ViewerView onBack={() => setMode('select')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Apsara Live</h1>
          <p className="text-gray-300">Real-time video streaming platform</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setMode('streamer')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-3"
          >
            <Video className="w-6 h-6" />
            <span>Start Streaming</span>
          </button>

          <button
            onClick={() => setMode('viewer')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-3"
          >
            <Users className="w-6 h-6" />
            <span>Watch Streams</span>
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          Choose your role to get started with live streaming
        </div>
      </div>
    </div>
  );
}
