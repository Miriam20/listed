import { Text } from "../../components/Text";
import Card from "react-bootstrap/esm/Card";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../config/firebase";
import { SecondaryButton } from "../../components/SecondaryButton";
import { Fragment, useEffect, useState } from "react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!auth.currentUser);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setIsUserLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const openEmailSignInModal = () => {
    setShowSignUpModal(true);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      {isUserLoggedIn ? (
        <Navigate to={"/"} replace />
      ) : (
        <Card title="listed">
          <Fragment>
            <Text>{auth.currentUser?.email ?? "not logged in"}</Text>
            <Text>Sign-up</Text>
            <SecondaryButton onClick={openEmailSignInModal}>
              E-mail and password
            </SecondaryButton>
            <Text>Or Login</Text>
            <SecondaryButton onClick={openLoginModal} variant="primary">
              Login with e-mail and password
            </SecondaryButton>
            <SecondaryButton onClick={signInWithGoogle}>
              Login with Google
            </SecondaryButton>
            {showSignUpModal && (
              <SignUpModal
                show={showSignUpModal}
                setShow={setShowSignUpModal}
                setUserLoggedIn={setIsUserLoggedIn}
              />
            )}
            {showLoginModal && (
              <LoginModal
                show={showLoginModal}
                setShow={setShowLoginModal}
                setUserLoggedIn={setIsUserLoggedIn}
              />
            )}
          </Fragment>
        </Card>
      )}
    </>
  );
};

export default LandingPage;
