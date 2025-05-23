 import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChattingRoom from "../components/ChattingRoom";

function Chats() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Sidebar - full width on mobile, 25% on desktop */}
      <div className="w-full md:w-[25%] lg:w-[20%] border-r bg-gray-100">
        <Sidebar setSelectedUser={setSelectedUser} />
      </div>

      {/* Chatting Room - full width on mobile, 75% on desktop */}
      <div className="w-full md:w-[75%] lg:w-[80%] flex items-center justify-center min-h-[calc(100vh-56px)] md:min-h-full">
        {selectedUser ? (
          <ChattingRoom selectedUser={selectedUser} />
        ) : (
          <div className="text-gray-500 text-lg md:text-xl font-medium p-4 text-center">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;