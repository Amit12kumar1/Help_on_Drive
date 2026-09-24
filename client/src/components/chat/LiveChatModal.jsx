import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import api from '../../services/api';
import { Send, X, MessageSquare, Phone } from 'lucide-react';

export default function LiveChatModal({
  isOpen,
  onClose,
  bookingId,
  partnerUser = { _id: '', name: 'Partner', avatar: '', role: 'driver' },
  onTriggerCall
}) {
  const { user } = useAuth();
  const { socket, joinBookingRoom } = useSocket();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && bookingId) {
      joinBookingRoom(bookingId);

      // Load past messages
      api.get(`/chat/${bookingId}`)
        .then((res) => {
          if (res.data.success) {
            setMessages(res.data.messages);
          }
        })
        .catch((err) => console.error('Error fetching chat history:', err));
    }
  }, [isOpen, bookingId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (msg.bookingId === bookingId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [socket, bookingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const payload = {
      bookingId,
      senderId: user?._id || user?.id,
      senderName: user?.name,
      senderAvatar: user?.avatar,
      senderRole: user?.role,
      receiverId: partnerUser?._id,
      text: inputMessage.trim(),
    };

    if (socket) {
      socket.emit('send_message', payload);
    } else {
      api.post('/chat', payload).then((res) => {
        if (res.data.success) setMessages((prev) => [...prev, res.data.message]);
      });
    }

    setInputMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:w-[420px] h-[550px] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Chat Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={partnerUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={partnerUser.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-brand-500"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <h4 className="font-semibold text-sm leading-tight">{partnerUser.name}</h4>
              <span className="text-xs text-slate-400 capitalize">
                {partnerUser.role === 'provider' ? 'Service Provider (Mechanic)' : 'Chauffeur / Driver'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onTriggerCall && (
              <button
                onClick={onTriggerCall}
                title="Call Partner"
                className="p-2 hover:bg-slate-800 text-emerald-400 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              Say hello! Live messaging is active.
            </div>
          )}

          {messages.map((msg, idx) => {
            const isMe = (msg.senderId?._id || msg.senderId) === (user?._id || user?.id);
            return (
              <div
                key={msg._id || idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 text-xs bg-slate-100 rounded-xl border border-transparent focus:border-brand-500 focus:bg-white outline-none transition-colors"
          />
          <button
            type="submit"
            className="p-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
