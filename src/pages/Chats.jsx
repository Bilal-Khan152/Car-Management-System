 import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChattingRoom from "../components/ChattingRoom";

function Chats() {
  const [selectedUser, setSelectedUser] = useState(null);

  
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-full md:w-[350px] border-r border-gray-200">
        <Sidebar setSelectedUser={setSelectedUser} />
      </div>

      {/* Chatting Room */}
      <div className="flex-1 overflow-hidden">
        <ChattingRoom selectedUser={selectedUser} />
      </div>
    </div>
  );

}

export default Chats;