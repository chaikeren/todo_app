import React, { useEffect, useState } from 'react'
import FCMenu from './FCMenu';
import jwt_decode from 'jwt-decode';
import '../App.css';

const CLIENT_ID = "Your client id";

export default function Main() {

  const [user, setUser] = useState({});

  function handleCallBackResponse(response) {
    //* decode the user jwt token and
    //* create user object with the decoded token
    //* hide the sign in button
    // console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    // console.log(userObject);
    setUser(userObject);
    document.querySelector("#signInDiv").hidden = true;
  }

  function handleSignOut() {
    //* remove the current user from out app
    //* show the sign in button
    setUser({});
    document.querySelector("#signInDiv").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallBackResponse
    });

    google.accounts.id.renderButton(
      document.querySelector("#signInDiv"),
      {theme: "outline", size: "large"}
    )
  }, []);


  //* if no user: sign in button
  //* if has user: show log out button
  return (
    <div>
      <div id='signInDiv'></div>
      {Object.keys(user).length !== 0 && 
        <div>
          <button 
            className='signOut'
            onClick={() => handleSignOut()}>Sign out</button>
          <FCMenu userData={user}/>
        </div> 
      }
    </div>
  )
}

