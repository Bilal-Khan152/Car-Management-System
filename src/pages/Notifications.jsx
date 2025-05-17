




function Notifications({ notifications }) {

 return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications :</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-2 ">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="bg-white border-2 border-red-400 p-3 rounded shadow hover:bg-gray-50"
            >
              <p className="text-black">{notification.message}</p>
              <p className="text-gray-700">Posted Date : {notification.date}</p>

            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notifications ;  
