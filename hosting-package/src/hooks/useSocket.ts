'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only initialize socket on client side
    if (typeof window !== 'undefined') {
      // Initialize socket connection
      socketRef.current = io(window.location.origin, {
        transports: ['websocket', 'polling']
      });

      const socket = socketRef.current;

      socket.on('connect', () => {
        console.log('Connected to server:', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, []);

  return socketRef.current;
};
