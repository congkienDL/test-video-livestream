const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Store active streams and viewers
  const activeStreams = new Map();
  const streamViewers = new Map();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle streamer starting a stream
    socket.on('start-stream', (streamData) => {
      const { streamKey, title, streamer } = streamData;
      
      activeStreams.set(streamKey, {
        id: streamKey,
        title,
        streamer,
        socketId: socket.id,
        startTime: new Date()
      });
      
      streamViewers.set(streamKey, new Set());
      
      console.log(`Stream started: ${title} by ${streamer}`);
      
      // Broadcast new stream to all clients
      socket.broadcast.emit('new-stream', {
        id: streamKey,
        title,
        streamer,
        viewers: 0,
        isLive: true
      });
    });

    // Handle streamer stopping a stream
    socket.on('stop-stream', (streamKey) => {
      if (activeStreams.has(streamKey)) {
        const stream = activeStreams.get(streamKey);
        activeStreams.delete(streamKey);
        streamViewers.delete(streamKey);
        
        console.log(`Stream stopped: ${stream.title}`);
        
        // Notify all viewers that stream ended
        socket.broadcast.emit('stream-ended', streamKey);
      }
    });

    // Handle viewer joining a stream
    socket.on('join-stream', (streamKey) => {
      if (streamViewers.has(streamKey)) {
        streamViewers.get(streamKey).add(socket.id);
        socket.join(`stream-${streamKey}`);
        
        const viewerCount = streamViewers.get(streamKey).size;
        
        // Update viewer count for this stream
        io.to(`stream-${streamKey}`).emit('viewer-count-update', {
          streamKey,
          count: viewerCount
        });
        
        console.log(`Viewer joined stream ${streamKey}. Total viewers: ${viewerCount}`);
      }
    });

    // Handle viewer leaving a stream
    socket.on('leave-stream', (streamKey) => {
      if (streamViewers.has(streamKey)) {
        streamViewers.get(streamKey).delete(socket.id);
        socket.leave(`stream-${streamKey}`);
        
        const viewerCount = streamViewers.get(streamKey).size;
        
        // Update viewer count for this stream
        io.to(`stream-${streamKey}`).emit('viewer-count-update', {
          streamKey,
          count: viewerCount
        });
        
        console.log(`Viewer left stream ${streamKey}. Total viewers: ${viewerCount}`);
      }
    });

    // Handle chat messages
    socket.on('chat-message', (data) => {
      const { streamKey, username, message } = data;
      
      const chatMessage = {
        id: Date.now().toString(),
        username,
        message,
        timestamp: new Date()
      };
      
      // Broadcast message to all viewers of this stream
      io.to(`stream-${streamKey}`).emit('new-chat-message', chatMessage);
      
      console.log(`Chat message in ${streamKey}: ${username}: ${message}`);
    });

    // Handle WebRTC signaling for peer-to-peer connections
    socket.on('offer', (data) => {
      socket.to(data.target).emit('offer', {
        offer: data.offer,
        sender: socket.id
      });
    });

    socket.on('answer', (data) => {
      socket.to(data.target).emit('answer', {
        answer: data.answer,
        sender: socket.id
      });
    });

    socket.on('ice-candidate', (data) => {
      socket.to(data.target).emit('ice-candidate', {
        candidate: data.candidate,
        sender: socket.id
      });
    });

    // Get list of active streams
    socket.on('get-streams', () => {
      const streams = Array.from(activeStreams.values()).map(stream => ({
        id: stream.id,
        title: stream.title,
        streamer: stream.streamer,
        viewers: streamViewers.get(stream.id)?.size || 0,
        isLive: true
      }));
      
      socket.emit('streams-list', streams);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      // Remove from all stream viewers
      streamViewers.forEach((viewers, streamKey) => {
        if (viewers.has(socket.id)) {
          viewers.delete(socket.id);
          const viewerCount = viewers.size;
          
          // Update viewer count
          io.to(`stream-${streamKey}`).emit('viewer-count-update', {
            streamKey,
            count: viewerCount
          });
        }
      });
      
      // Check if disconnected user was a streamer
      activeStreams.forEach((stream, streamKey) => {
        if (stream.socketId === socket.id) {
          activeStreams.delete(streamKey);
          streamViewers.delete(streamKey);
          
          // Notify all viewers that stream ended
          socket.broadcast.emit('stream-ended', streamKey);
          console.log(`Stream ended due to streamer disconnect: ${stream.title}`);
        }
      });
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
