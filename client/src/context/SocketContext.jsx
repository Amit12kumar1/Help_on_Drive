import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [sosAlertNotification, setSosAlertNotification] = useState(null);
  const [latestChatNotification, setLatestChatNotification] = useState(null);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('⚡ Connected to Help On Drive Real-Time Socket Server');
      if (user?._id || user?.id) {
        newSocket.emit('join_user_room', user._id || user.id);
      }
    });

    // Listen for Emergency SOS Broadcast
    newSocket.on('emergency_sos_broadcast', (data) => {
      console.warn('🚨 EMERGENCY SOS BROADCAST RECEIVED:', data);
      setSosAlertNotification(data);
    });

    // Listen for personal chat notification
    newSocket.on('chat_notification', (data) => {
      setLatestChatNotification(data);
      setTimeout(() => setLatestChatNotification(null), 5000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const joinBookingRoom = (bookingId) => {
    if (socket && bookingId) {
      socket.emit('join_booking', bookingId);
    }
  };

  const leaveBookingRoom = (bookingId) => {
    if (socket && bookingId) {
      socket.emit('leave_booking', bookingId);
    }
  };

  const broadcastLocation = (bookingId, role, lat, lng, heading = 0) => {
    if (socket && bookingId) {
      socket.emit('update_location', { bookingId, role, lat, lng, heading });
    }
  };

  const emitStatusChange = (bookingId, status, message) => {
    if (socket && bookingId) {
      socket.emit('status_change', { bookingId, status, message });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        joinBookingRoom,
        leaveBookingRoom,
        broadcastLocation,
        emitStatusChange,
        sosAlertNotification,
        setSosAlertNotification,
        latestChatNotification,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
