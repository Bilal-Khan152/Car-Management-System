 import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

function ChattingRoom({ selectedUser }) {

 //console.log("selectedUser_Details" ,selectedUser)


  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const firebase = useFirebase();

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

  // console.log("Sender:", firebase.user?.uid);
  // console.log("Receiver:", selectedUser);
  // console.log("Chat ID:", chatId);
  // console.log("User Input Text:", inputText);

  await firebase.sendMessage(chatId, {
    senderId: firebase.user.uid,
    receiverId: selectedUser.uid,
    text: inputText,
    createdAt: new Date()
  });

  setInputText("");
};


  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <h2 className="text-xl font-semibold text-gray-800">
          Chat with {selectedUser?.role || "User"}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                msg.senderId === firebase.user.uid
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-white mr-auto"
              }`}
            >
              <p className="text-sm text-gray-800">{msg.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                {msg.senderId === firebase.user.uid ? "You" : "Them"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">No messages yet.</p>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleOnSendButton}
          className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChattingRoom;
