'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Users, Eye, MessageCircle, Send } from 'lucide-react';

interface StreamerViewProps {
  onBack: () => void;
}

interface Stream {
  id: string;
  title: string;
  streamer: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

export default function ViewerView({ onBack }: StreamerViewProps) {
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'StreamFan123',
      message: 'Great stream! 🔥',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: '2',
      username: 'TechGuru',
      message: 'Amazing quality!',
      timestamp: new Date(Date.now() - 30000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [liveStreams, setLiveStreams] = useState<Stream[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Socket functionality disabled for build compatibility

  useEffect(() => {
    // Mock data for demo - TODO: Re-enable socket functionality
    const mockStreams: Stream[] = [
      {
        id: '1',
        title: 'Live Coding Session - Building React App',
        streamer: 'CodeMaster',
        viewers: 1234,
        thumbnail: '/api/placeholder/320/180',
        isLive: true
      },
      {
        id: '2',
        title: 'Gaming Stream - Latest Adventure',
        streamer: 'GamePro',
        viewers: 856,
        thumbnail: '/api/placeholder/320/180',
        isLive: true
      },
      {
        id: '3',
        title: 'Music Production Live',
        streamer: 'BeatMaker',
        viewers: 432,
        thumbnail: '/api/placeholder/320/180',
        isLive: true
      }
    ];

    setLiveStreams(mockStreams);

    // TODO: Re-enable socket functionality after build
    // if (socket) {
    //   // Request current streams when component mounts
    //   socket.emit('get-streams');
    //
    //   // Listen for streams list
    //   socket.on('streams-list', (streams: Stream[]) => {
    //     setLiveStreams(streams);
    //   });
    //
    //   // Listen for new streams
    //   socket.on('new-stream', (stream: Stream) => {
    //     setLiveStreams(prev => [...prev, stream]);
    //   });
    //
    //   // Listen for stream ended
    //   socket.on('stream-ended', (streamKey: string) => {
    //     setLiveStreams(prev => prev.filter(stream => stream.id !== streamKey));
    //     if (selectedStream?.id === streamKey) {
    //       setSelectedStream(null);
    //     }
    //   });
    //
    //   // Listen for viewer count updates
    //   socket.on('viewer-count-update', (data) => {
    //     setLiveStreams(prev => prev.map(stream =>
    //       stream.id === data.streamKey
    //         ? { ...stream, viewers: data.count }
    //         : stream
    //     ));
    //
    //     if (selectedStream?.id === data.streamKey) {
    //       setSelectedStream(prev => prev ? { ...prev, viewers: data.count } : null);
    //     }
    //   });
    //
    //   // Listen for new chat messages
    //   socket.on('new-chat-message', (message: ChatMessage) => {
    //     setChatMessages(prev => [...prev, message]);
    //   });
    // }

    // return () => {
    //   if (socket) {
    //     socket.off('streams-list');
    //     socket.off('new-stream');
    //     socket.off('stream-ended');
    //     socket.off('viewer-count-update');
    //     socket.off('new-chat-message');
    //   }
    // };
  }, []);

  const filteredStreams = liveStreams.filter(stream =>
    stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stream.streamer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim() && selectedStream) {
      // TODO: Re-enable socket functionality when needed
      // Socket functionality is disabled for build compatibility

      // Mock chat message for demo
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: 'You',
        message: newMessage,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    // TODO: Re-enable socket functionality
    // if (selectedStream && socket) {
    //   // Join the stream room for real-time updates
    //   socket.emit('join-stream', selectedStream.id);
    //
    //   return () => {
    //     // Leave the stream room when component unmounts or stream changes
    //     socket.emit('leave-stream', selectedStream.id);
    //   };
    // }
  }, [selectedStream]);

  if (selectedStream) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedStream(null)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Streams</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>{selectedStream.viewers.toLocaleString()} viewers</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400">LIVE</span>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Player */}
          <div className="flex-1 p-6">
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                controls
                autoPlay
                className="w-full aspect-video"
                poster="/api/placeholder/800/450"
              />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{selectedStream.title}</h1>
              <p className="text-gray-300">by {selectedStream.streamer}</p>
            </div>
          </div>

          {/* Chat */}
          <div className="w-80 bg-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Live Chat</span>
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="font-semibold text-blue-400">{msg.username}:</span>
                  <span className="ml-2">{msg.message}</span>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search streams..."
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm w-64"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Live Streams</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStreams.map((stream) => (
            <div
              key={stream.id}
              onClick={() => setSelectedStream(stream)}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-750 transition-colors"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                  <Eye className="w-12 h-12 text-gray-400" />
                </div>
                
                {stream.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    LIVE
                  </div>
                )}
                
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {stream.viewers.toLocaleString()} viewers
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-2">{stream.title}</h3>
                <p className="text-gray-400 text-sm">{stream.streamer}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStreams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No streams found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
