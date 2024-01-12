import styled from "@emotion/styled";
import { ComponentProps } from "react";
import { Button } from "react-bootstrap";

export const PrimaryButton = styled((props: ComponentProps<typeof Button>) => {
  return <Button {...props} variant="outline-dark" />;
})`
  align-self: flex-start;
  align-self: center;
  margin: 2px;
  border: 2px solid;
`;
