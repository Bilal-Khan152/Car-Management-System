 import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChattingRoom from "../components/ChattingRoom";

function Chats() {
  const [selectedUser, setSelectedUser] = useState(null);

  
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar - full width on mobile, fixed width on desktop */}
      <div className="w-full md:w-[320px] border-r">
        <Sidebar setSelectedUser={setSelectedUser} />
      </div>

      {/* Chatting Room - full width on mobile, flex-grow on desktop */}
      <div className="flex-1">
        {selectedUser ? (
          <ChattingRoom selectedUser={selectedUser} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 italic">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );

}

export default Chats;