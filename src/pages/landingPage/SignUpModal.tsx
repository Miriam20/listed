import { BaseSyntheticEvent, Fragment, useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PrimaryButton } from "../../components/PrimaryButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { FIREBASE_ERROR_CODES } from "../../constants";

type SignUpModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  setUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({
  show,
  setShow,
  setUserLoggedIn,
}) => {
  const handleClose = () => setShow(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [passwordNotConfirmed, setPasswordNotConfirmed] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);

  const checkPasswordValidity = () => {
    const isPasswordTooShort = password.length < 6;
    const isConfirmedPasswordWrong = password !== confirmedPassword;
    const isConfirmedPasswordNotEntered = confirmedPassword === "";
    setPasswordTooShort(isPasswordTooShort);
    setPasswordsDontMatch(isConfirmedPasswordWrong);
    setPasswordNotConfirmed(isConfirmedPasswordNotEntered);

    return !isPasswordTooShort && !isConfirmedPasswordWrong;
  };

  const checkEmailValidity = useCallback(() => {
    const isEmailValid = Boolean(
      email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    );
    setEmailInvalid(!isEmailValid);
    return isEmailValid;
  }, [email]);

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    const isEmailValid = checkEmailValidity();
    const isPasswordValid = checkPasswordValidity();
    event.preventDefault();
    event.stopPropagation();
    if (isEmailValid && isPasswordValid) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setUserLoggedIn(true);
        handleClose();
      } catch (error: any) {
        if (error.code === FIREBASE_ERROR_CODES.EMAIL_ALREADY_IN_USE) {
          setEmailAlreadyInUse(true);
        }
      }
    }
  };

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="control.email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                isInvalid={emailInvalid || emailAlreadyInUse}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailInvalid(false);
                  setEmailAlreadyInUse(false);
                }}
              />
              {emailInvalid && (
                <Form.Control.Feedback type="invalid">
                  Please, provide a valid e-mail
                </Form.Control.Feedback>
              )}
              {emailAlreadyInUse && (
                <Form.Control.Feedback type="invalid">
                  Email already in use
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="control.password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTooShort(false);
                }}
                isInvalid={passwordTooShort}
                pattern="[\d\D]{6,}"
              />
              {passwordTooShort && (
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="control.confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                  setPasswordsDontMatch(false);
                  setPasswordNotConfirmed(false);
                }}
                isInvalid={passwordsDontMatch || passwordNotConfirmed}
              />
              {passwordsDontMatch && !passwordNotConfirmed && (
                <Form.Control.Feedback type="invalid">
                  Passwords don't match
                </Form.Control.Feedback>
              )}
              {passwordNotConfirmed && (
                <Form.Control.Feedback
                  type="invalid"
                  className="invalid-feedback"
                >
                  Please, confirm your password
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <PrimaryButton right type="submit">
              Save
            </PrimaryButton>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default SignUpModal;
