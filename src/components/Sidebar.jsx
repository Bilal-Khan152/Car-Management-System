import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { User2 } from "lucide-react";

function Sidebar({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [activeUserUID, setActiveUserUID] = useState(null);
  const firebase = useFirebase();

  // Fetch all users except the current user
  useEffect(() => {
    const getUsers = async () => {
      if (firebase.isLoggedIn) {
        const role = localStorage.getItem("userRole");
        const fetchedUsers =
          await firebase.fetchAllUsersFromUserCollectionExceptCurrentUser(role);
        setUsers(fetchedUsers);
      }
    };

    getUsers();
  }, [firebase.isLoggedIn, firebase.user, firebase.role]);

  const handleOpenChat = async (otherUser) => {
    await firebase.createOrFetchChat(otherUser.uid);
    setSelectedUser(otherUser);
    setActiveUserUID(otherUser.uid);
  };

  return (
    <div className="h-screen w-full md:w-[350px] bg-gray-50 border-r border-gray-200 flex flex-col">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 p-4 pt-36 pb-2">
        Your Chats
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-6">
        {users.length > 0 ? (
          users.map((user) => {
            const isActive = user.uid === activeUserUID;

            return (
              <div
                key={user.uid}
                onClick={() => handleOpenChat(user)}
                className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl cursor-pointer transition w-full 
                                    ${
                                      isActive
                                        ? "bg-blue-100 shadow-lg"
                                        : "bg-white shadow-md hover:bg-blue-50"
                                    }`}
              >
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <User2 className="w-5 h-5" />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <p className="text-base sm:text-lg md:text-xl font-semibold italic text-gray-800 truncate">
                    {user.userName}
                  </p>
                  <p
                    className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded inline-block tracking-widest 
                                            ${
                                              user.role === "admin"
                                                ? "bg-red-800 text-white"
                                                : "bg-blue-600 text-white"
                                            }`}
                  >
                    {user.role.toUpperCase()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 italic text-center mt-6">
            No other users found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
