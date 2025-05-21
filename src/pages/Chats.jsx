 import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChattingRoom from "../components/ChattingRoom";

function Chats() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen w-full flex">
      {/* Sidebar */}
      <div className="w-[25%] border-r bg-gray-100">
        <Sidebar setSelectedUser={setSelectedUser} />
      </div>

      {/* Chatting Room */}
      <div className="w-[75%] flex items-center justify-center">
        {selectedUser ? (
          <ChattingRoom selectedUser={selectedUser} />
        ) : (
          <div className="text-gray-500 text-xl font-medium">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
