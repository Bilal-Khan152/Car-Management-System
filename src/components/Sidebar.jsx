import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { User2 } from 'lucide-react';

function Sidebar({ setSelectedUser }) {
    const [users, setUsers] = useState([]);
    // console.log(users)
    const [activeUserUID, setActiveUserUID] = useState(null);
    const firebase = useFirebase();

    // Fetch all users except the current user
    useEffect(() => {
        const getUsers = async () => {
            if (firebase.isLoggedIn) {
                const role = localStorage.getItem("userRole");
                const fetchedUsers = await firebase.fetchAllUsersFromUserCollectionExceptCurrentUser(role);
                setUsers(fetchedUsers);
            }
        };

        getUsers();
    }, [firebase.isLoggedIn, firebase.user, firebase.role]);

    const handleOpenChat = async (otherUser) => {
        await firebase.createOrFetchChat(otherUser.uid);
        setSelectedUser(otherUser);
        setActiveUserUID(otherUser.uid); // set active user
    };

    return (
       <div className="h-full p-4 bg-gray-50 border-r border-gray-200 w-full md:w-[350px] overflow-hidden">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Your Chats</h2>

    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-100px)] pr-2">
        {users.length > 0 ? (
            users.map((user) => {
                const isActive = user.uid === activeUserUID;

                return (
                    <div
                        key={user.uid}
                        onClick={() => handleOpenChat(user)}
                        className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl cursor-pointer transition 
                            ${isActive ? "bg-blue-100 shadow-lg" : "bg-white shadow-md hover:bg-blue-50"}`}
                    >
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                            <User2 className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-base sm:text-lg md:text-xl font-semibold italic text-gray-800">{user.userName}</p>
                            <p className="text-[10px] sm:text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded inline-block tracking-widest">
                                {user.role.toUpperCase()}
                            </p>
                            {/* <p className="text-sm text-gray-500 capitalize">{user.email}</p> */}
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="text-gray-500 italic text-center">No other users found.</div>
        )}
    </div>
</div>

    );
}

export default Sidebar;
