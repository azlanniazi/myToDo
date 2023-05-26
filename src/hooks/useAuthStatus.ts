import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config";

function useAuthStatus() {
  const [checkingUserStatus, setCheckingUserStatus] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingUserStatus(false);
    });
  }, []);

  return [loggedIn, checkingUserStatus];
}

export default useAuthStatus;
