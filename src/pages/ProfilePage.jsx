 import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const data = await firebase.getCurrentUserDetailsFromFirestore();
      setUserData(data);
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-[50px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {userData?.userName?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Username</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userData?.userName}</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userData?.email}</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">{userData?.role}</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">User ID</p>
              <p className="mt-1 text-sm font-mono text-gray-600 break-all">{userData?.uid}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;