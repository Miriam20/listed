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
      if (user) {
        setIsUserLoggedIn(true);
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
                user={auth.currentUser}
              >
                <Home user={auth.currentUser} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
