import React from 'react' ; 
import { useFirebase } from '../context/Firebase' ;
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const firebase = useFirebase() ; 
  const navigate = useNavigate() ;

  function handleLogOut(){
     firebase.signOutUser() ;
     alert("Logged out successfully!") ;
     navigate("/login") ;
    

  }


  return (
    <div>
      Home Page 
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default HomePage
