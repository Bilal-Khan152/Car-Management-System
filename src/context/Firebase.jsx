/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut

} from "firebase/auth";
import {
  getFirestore ,
  doc , 
  setDoc ,
  addDoc ,
  collection ,
  getDocs ,
  getDoc ,
  query ,
  where ,
  updateDoc ,
  Timestamp ,
  orderBy ,
  onSnapshot ,
  serverTimestamp ,
  arrayUnion 

} from "firebase/firestore";

const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyD3SXszLfs4X6HTnPFb4H-xcAvrDWcV0ic",
  authDomain: "car-management-app-a55b7.firebaseapp.com",
  projectId: "car-management-app-a55b7",
  storageBucket: "car-management-app-a55b7.firebasestorage.app",
  messagingSenderId: "818283505102",
  appId: "1:818283505102:web:ab5f48645fd5572084779f",
};

export const app = initializeApp(firebaseConfig);

// custom  hook

export const useFirebase = () => useContext(FirebaseContext);

const firebaseAuth = getAuth(app);
export const db = getFirestore(app);

export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null) ;
  const [role, setRole] = useState(null) ;
  const [isLoading, setIsLoading] = useState(true) ;

    //  console.log(role)
    //  console.log(user)
    //  console.log("Current UID:", user?.uid);





  // saved user role in local storage and in state
  useEffect(() => {
  const savedRole = localStorage.getItem("userRole");
  if (savedRole) {
    setRole(savedRole);
  }

  const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      setUser(user);

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userRole = userDocSnap.data().role;
          setRole(userRole);
          localStorage.setItem("userRole", userRole);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setIsLoading(false); //  Done loading even if error occurs
      }

    } else {
      setUser(null);
      setRole(null);
      localStorage.removeItem("userRole");
      setIsLoading(false); // ✅ Done loading for logged out users
    }
  });

  return () => unsubscribe();
}, []);



  // register new users and create users collection firestore and save the user data
  const signUpUser = async (email, password, role) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredentials.user;

      console.log("user role", role);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: new Date(),
      });

      // 🔥 Add this to fetch and set the role in context
      setRole(role);
      localStorage.setItem("userRole", role);

    } catch (error) {
      console.log("Error", error);
    }
  };

  // existing users
  const signInUser = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredentials.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userRole = null;

      if (userDocSnap.exists()) {
        userRole = userDocSnap.data().role;
        setRole(userRole);
        localStorage.setItem("userRole", userRole);

      }

      return { user, role: userRole };
    } catch (error) {
      console.error("Firebase signInUser error:", error);
      throw error; // Rethrow to be caught in LoginPage
    }
  };

  // logout
  const signOutUser = async () => {

    try {
      await signOut(firebaseAuth);
      alert("Logged out successfully!");
      // Optional: Redirect or update UI
      // navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  // to store admin car details in firestore
  const storedCarDetail = async (carName, description, carModal, price) => {
    return await addDoc(collection(db, "cars"), {
      carName,
      description,
      carModal,
      price,
      createdAt: new Date()
    });
  };

  // to store renter car details in firestore
  const storedRenterCarDetails = async (carName, description, price, carModal) => {
    return await addDoc(collection(db, "renter"), {
      carName,
      description,
      price,
      carModal,
      status: "pending",
      createdAt: new Date()
    });
  };

  // to get all the Rentercards
  const getRenterCards = async () => {

    const renterRef = (collection(db, "renter"));
    const q = query(renterRef, where("status", "==", "pending"))
    const sanpshot = await getDocs(q);
    return sanpshot

  };

  // to get all the cards of cars
  const getCarCardData = () => {
    return getDocs(collection(db, "cars"));
  };

  // gets cars data basic on the given id 
  const getCarsCardDataById = async (id) => {
    const docRef = doc(db, "cars", id);
    const result = await getDoc(docRef);
    return result;
  }

  // gets Rent cars data basis on the given id 
  const getRenterCardsById = async (id) => {
    const docRef = doc(db, "renter", id);
    const result = await getDoc(docRef);
    return result;
  }

  // to get accepted car from admin which is post by renter   
  const getAcceptedRenterCards = async () => {
    const renterRef = collection(db, "renter");
    const q = query(renterRef, where("status", "==", "accept"));
    const snapshot = await getDocs(q);
    return snapshot;
  };

  //  get the notification from notification collection which assign to admin
   const fetchNotifications = async (userId) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    console.error("User role not found in localStorage");
    return [];
  }

  try {
    const q = query(
      collection(db, "notifications"),
      where("toRoles", "array-contains", userRole),
      // orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const notifications = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(notification => !notification.readBy?.includes(userId)); // Only unread for this user

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications: ", error);
    return [];
  }
};


  // function to change the read property   ( mark as read button ) 
  const markNotificationAsRead = async (notificationId, userId) => {
  try {
    const notifRef = doc(db, "notifications", notificationId);
    await updateDoc(notifRef, {
      readBy: arrayUnion(userId), // adds userId to readBy array
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

  // accept renter post and change their status from pending to accept
  const acceptRenterRequest = async (createdAtDate) => {
    const firebaseTimestamp = Timestamp.fromDate(createdAtDate);
    const renterRef = collection(db, "renter");
    const q = query(renterRef, where("createdAt", "==", firebaseTimestamp));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No matching renter document found.");
    }

    const renterDoc = querySnapshot.docs[0];
    await updateDoc(renterDoc.ref, { status: "accept" });
  };


  // fetch all user from users collection except current user 
  const fetchAllUsersFromUserCollectionExceptCurrentUser = async (targetRole ) => {
    if(!user) return [] ;


    try {
      const usersRef = collection(db , "users") ;
      const snapshot = await getDocs(usersRef)  ;

      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).
      filter((u) => u.uid !== user.uid && u.role !== targetRole  ) ; // we use filter bcz we dont need current user in sidebar
      //console.log(users)
      return users ;
      
    } catch (error) {
      console.log("Error fetching" , error)
      
    }

  }

 // create the conversation document or if already exist then fetch the documents 
 const createOrFetchChat = async (otherUserUID) => {
  
  const currentUserUID = user.uid ;
  console.log("Current user uid :", currentUserUID);
  console.log("other user uid :", otherUserUID);
  const conversationID = [currentUserUID , otherUserUID ].sort().join("_") ;
  const chatRef = doc(db,"conversations",conversationID) ;

  const chatSnap = await getDoc(chatRef) ;

  if(!chatSnap.exists()){
    await setDoc(chatRef , {
      participants : [currentUserUID , otherUserUID] ,
      createdAt : new Date() 
    }) ;
    console.log("chat created" , conversationID)
  } else {
    console.log("chat already exists : " , conversationID)
  }

  return conversationID ;

 }

 // create the sub collection in the specifci document id (custom id) or if in case sub collection then fetch the latest messages 

 const listenToMessages = (chatId,callback) => {
const messagesRef = collection(db,"conversations" , chatId , "messages") ; 
const q = query(messagesRef , orderBy("createdAt","asc")) ; 

return onSnapshot( q , (sanpshot) => {
  const messages = sanpshot.docs.map((doc)=>({
    id  : doc.id , 
    ...doc.data(),
  })) ;
  callback(messages) ;
})



 }

 // for custom id 
 const generateCustomChatId = (uid1, uid2) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
}

 // when user click on send button 
 const sendMessage = async (chatId , messageData) => {
  const docref = doc(db , "conversations" , chatId) ;
  
  await setDoc(docref , {
    participants : [messageData.senderId  , messageData.receiverId]
  } , {merge:true}) ;

  await addDoc(collection(db , "conversations" , chatId , "messages") , {
    ...messageData , 
    createdAt : serverTimestamp()
  })

 } 

 const isLoggedIn = user ? true : false;

  return (
    <>
      <FirebaseContext.Provider
        value={{
         fetchAllUsersFromUserCollectionExceptCurrentUser ,
           
          signUpUser,
          signInUser,
          storedCarDetail,
          storedRenterCarDetails,
          isLoggedIn,
          getCarCardData,         
          getRenterCards,
          signOutUser,
           fetchNotifications ,
          acceptRenterRequest,
          getAcceptedRenterCards,
          getCarsCardDataById,
          getRenterCardsById ,         
          createOrFetchChat , 
          listenToMessages ,
          generateCustomChatId ,
          markNotificationAsRead  , 
          sendMessage  , 
           isLoading , 
           user , 
           role,
        }}
      >
        {props.children}
      </FirebaseContext.Provider>
    </>
  );
};
