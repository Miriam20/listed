import styled from "@emotion/styled";
import { Button, ButtonProps } from "react-bootstrap";

type PrimaryButtonProps = ButtonProps & { right?: boolean };

export const PrimaryButton: React.FC<PrimaryButtonProps> = styled(
  (props: PrimaryButtonProps) => {
    return <Button {...props} variant="dark" />;
  }
)`
  align-self: flex-start;
  align-self: center;
  margin: 2px;
  float: ${({ right }) => (right ? `right` : `left`)};
`;
