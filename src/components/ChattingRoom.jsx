import React, { useEffect, useState, useRef } from 'react';
import { useFirebase } from '../context/Firebase';
import { Send, User2 } from 'lucide-react';

function ChattingRoom({ selectedUser }) {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const firebase = useFirebase();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!selectedUser) return;

    const chatId = firebase.generateCustomChatId(firebase.user.uid, selectedUser.uid);
    const unsubscribe = firebase.listenToMessages(chatId, (msg) => setMessages(msg));
    return () => unsubscribe();
  }, [selectedUser]);

  const handleOnSendButton = async () => {
    if (!selectedUser || !firebase.user?.uid) {
      console.warn("Either selectedUser or sender is missing");
      return;
    }

    if (inputText.trim() === "") return;

    const chatId = firebase.generateCustomChatId(firebase.user.uid, selectedUser.uid);

    await firebase.sendMessage(chatId, {
      senderId: firebase.user.uid,
      receiverId: selectedUser.uid,
      text: inputText,
      createdAt: new Date()
    });

    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleOnSendButton();
    }
  };

  if (!selectedUser) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="flex justify-center mb-4">
            <User2 className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Conversation Selected</h3>
          <p className="text-gray-500 text-sm">Choose a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <User2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedUser?.userName}
            </h2>
            <p className="text-sm text-gray-500 capitalize">
              {selectedUser?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isSender = msg.senderId === firebase.user.uid;
            return (
              <div
                key={msg.id}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] px-4 py-2 rounded-2xl ${
                    isSender
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className={`text-sm ${isSender ? 'text-white' : 'text-gray-800'}`}>
                    {msg.text}
                  </p>
                  <p className={`text-xs mt-1 ${isSender ? 'text-blue-100' : 'text-gray-400'}`}>
                    {new Date(msg.createdAt?.seconds * 1000).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-500 text-sm">No messages yet</p>
            <p className="text-gray-400 text-xs mt-1">Send a message to start the conversation</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 items-center">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleOnSendButton}
            disabled={!inputText.trim()}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChattingRoom;
