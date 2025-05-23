import { useFirebase } from "../context/Firebase";

function Notifications({ notifications , setNotications  }) {

 const firebase = useFirebase() ;


 //  console.log(notifications)


  const hanldeMarkAsReadButton = async (id) => {
    if(!firebase.user) return ;
    await firebase.markNotificationAsRead (id ,firebase.user.uid) 
        setNotications((prev) => prev.filter((n) => n.id !== id));

  }

  return (
  <div className="p-6 max-w-3xl mx-auto">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
      Notifications
    </h2>

    {notifications.length === 0 ? (
      <p className="text-gray-500 text-center">No notifications yet.</p>
    ) : (
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="bg-white border border-red-300 rounded-xl shadow-md p-5 transition hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <p className="text-gray-900 font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Posted Date: {notification.date}
                </p>
              </div>
              <button
                onClick={() => hanldeMarkAsReadButton(notification.id)}
                className="text-sm cursor-pointer text-blue-600 hover:underline self-start sm:self-center"
              >
                Mark as read
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

}

export default Notifications ;  
