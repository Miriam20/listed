import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { PrimaryButton } from "./PrimaryButton";
import { User } from "../entities/User";

type NavigationBarProps = {
  logout: () => void;
  user: User;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  logout,
  user,
}: NavigationBarProps) => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {user?.displayName}
            <PrimaryButton onClick={logout}>Logout</PrimaryButton>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
