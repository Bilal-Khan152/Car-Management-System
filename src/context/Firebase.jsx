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
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where ,
  updateDoc ,
  Timestamp
  
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
  
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);



 


 useEffect(() => {
  const savedRole = localStorage.getItem("userRole");
  if (savedRole) {
    setRole(savedRole); // Restore role from localStorage if present
  }

  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      setUser(user);
      // Check if the role exists in Firestore or localStorage and set it
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userRole = userDocSnap.data().role;
        setRole(userRole);
        localStorage.setItem("userRole", userRole); // Update localStorage with role
      }
    } else {
      setUser(null);
      setRole(null);
      localStorage.removeItem("userRole"); // Remove role from localStorage when logged out
    }
  });
}, []);


  // register new users
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

  const storedCarDetail = async (carName, description , carModal , price) => {
    return await addDoc(collection(db, "cars"), {
      carName,
      description,
      carModal , 
      price ,
      createdAt : new Date() 
    });
  };

  // to store renter car details in firestore

  const storedRenterCarDetails = async (carName, description, price , carModal) => {
    return await addDoc(collection(db, "renter"), {
      carName,
      description,
      price,
      carModal , 
      status : "pending" , 
      createdAt : new Date() 
    });    
  };

  // to get all the Rentercards

  const getRenterCards = async() => {
    
    const renterRef =   (collection(db, "renter"));
    const q  = query(renterRef , where("status","==","pending"))
     const sanpshot = await getDocs(q) ; 
     return sanpshot

  };

  // to get all the cards of cars
  const getCarCardData = () => {
    return getDocs(collection(db, "cars"));
  };

 // gets cars data basic on the given id 

  const getCarsCardDataById = async (id) => {
    const docRef = doc(db , "cars" , id) ;
    const result = await getDoc(docRef);
    return result;
  }
  
  // gets Rent cars data basis on the given id 

  const getRenterCardsById = async (id) => {
    const docRef = doc(db , "renter" , id) ;
    const result = await getDoc(docRef) ;
    return result ;
  }



  // to get accepted car from admin which is post by renter 
  
   const getAcceptedRenterCards = async () => {
  const renterRef = collection(db, "renter");
  const q = query(renterRef, where("status", "==", "accept"));
  const snapshot = await getDocs(q);
  return snapshot;
};



 //  get the notification from notification collection which assign to admin
 

const fetchNotifications = async () => {
  // Get user role from localStorage
  const userRole = localStorage.getItem('userRole');  

  if (!userRole) {
    console.error("User role not found in localStorage");
    return;
  }

  try {
    const q = query(
      collection(db, "notifications"),
      where("toRoles", "array-contains", userRole) // Role dynamically fetched
    );

    const querySnapshot = await getDocs(q);

    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(notifications);
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications: ", error);
    return [];
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




  const isLoggedIn = user ? true : false;

  return (
    <>
      <FirebaseContext.Provider
        value={{
          signUpUser,
          signInUser,
          storedCarDetail,
          storedRenterCarDetails,
          isLoggedIn,
          getCarCardData,
          role,
          getRenterCards,
          signOutUser , 
          fetchNotifications  ,
          acceptRenterRequest , 
          getAcceptedRenterCards , 
          getCarsCardDataById , 
          getRenterCardsById 
        }}
      >
        {props.children}
      </FirebaseContext.Provider>
    </>
  );
};
