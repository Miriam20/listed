import { BaseSyntheticEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import { PrimaryButton } from "../../components/PrimaryButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { FIREBASE_ERROR_CODES } from "../../constants";
import Alert from "react-bootstrap/esm/Alert";
import Modal from "../../components/Modal/Modal";
import ModalBody from "../../components/Modal/ModalBody";

type LoginModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  setUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  setShow,
  setUserLoggedIn,
}) => {
  const handleClose = () => setShow(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const checkCredentialsNotEmpty = () => {
    const isEmailEmpty = email.length === 0;
    const isPasswordEmpty = password.length === 0;
    setEmptyEmail(isEmailEmpty);
    setEmptyPassword(isPasswordEmpty);
    return [isEmailEmpty, isPasswordEmpty];
  };

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    const [isEmailEmpty, isPasswordEmpty] = checkCredentialsNotEmpty();
    event.preventDefault();
    event.stopPropagation();
    if (!isEmailEmpty && !isPasswordEmpty) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setUserLoggedIn(true);
        handleClose();
      } catch (error: any) {
        console.log(error.code);

        if (
          error.code === FIREBASE_ERROR_CODES.INVALID_CREDENTIALS ||
          error.code === FIREBASE_ERROR_CODES.INVALID_EMAIL
        ) {
          setInvalidCredentials(true);
        }
      }
    }
  };

  return (
    <Modal title="login" show={show} close={handleClose}>
      {invalidCredentials && (
        <Alert variant="danger">
          Oops... It looks like you provided invalid credentials!
        </Alert>
      )}
      <ModalBody>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="control.email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              isInvalid={emptyEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {emptyEmail && (
              <Form.Control.Feedback type="invalid">
                Please, provide an e-mail
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="control.password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              isInvalid={emptyPassword}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {emptyPassword && (
              <Form.Control.Feedback type="invalid">
                Please, provide a password
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <PrimaryButton right type="submit">
            Submit
          </PrimaryButton>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;
