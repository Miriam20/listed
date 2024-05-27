import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage";
import { PrivateRoute } from "../components/PrivateRoute";
import Home from "./home";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    Boolean(auth.currentUser)
  );
  const [currentUser, setCurrentUser] = useState({
    email: "",
    displayName: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      setIsUserLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email && user.displayName) {
        setIsUserLoggedIn(true);
        setCurrentUser({
          email: user.email,
          displayName: user.displayName,
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<LandingPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute
                isUserLoggedIn={isUserLoggedIn}
                isLoading={isLoading}
                logout={logout}
                user={currentUser}
              >
                <Home user={currentUser} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
