import Text from "../../components/Text";
import { PrimaryButton } from "../../components/PrimaryButton";
import Card from "react-bootstrap/esm/Card";

const LandingPage = () => {
  return (
    <Card title="listed">
      <Text>Registrati</Text>
      <PrimaryButton>Email e password</PrimaryButton>
      <PrimaryButton>Google</PrimaryButton>
      <Text>Oppure accedi</Text>
      <PrimaryButton variant="primary">Accedi</PrimaryButton>
    </Card>
  );
};

export default LandingPage;
