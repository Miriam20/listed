import Text from "../../components/Text";
import Card from "react-bootstrap/esm/Card";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../../config/firebase";
import { SecondaryButton } from "../../components/SecondaryButton";
import { Fragment, useState } from "react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

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

  const logout = async () => {
    try {
      await signOut(auth);
      setIsUserLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card title="listed">
      {isUserLoggedIn ? (
        <Fragment>
          <Text>{`Hello ${auth?.currentUser?.email}!`}</Text>
          <SecondaryButton type="submit" onClick={logout}>
            Logout
          </SecondaryButton>
        </Fragment>
      ) : (
        <Fragment>
          <Text>Sign-up</Text>
          <SecondaryButton onClick={openEmailSignInModal}>
            Email and password
          </SecondaryButton>
          <SecondaryButton onClick={signInWithGoogle}>Google</SecondaryButton>
          <Text>Or Login</Text>
          <SecondaryButton onClick={openLoginModal} variant="primary">
            Login
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
      )}
    </Card>
  );
};

export default LandingPage;
