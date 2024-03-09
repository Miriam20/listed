import styled from "@emotion/styled";
import { Button, ButtonProps } from "react-bootstrap";

export const SecondaryButton: React.FC<ButtonProps> = styled(
  (props: ButtonProps) => {
    return <Button {...props} variant="outline-dark" />;
  }
)`
  align-self: flex-start;
  align-self: center;
  margin: 2px;
`;
