import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type TextProps = {
  direction?: "row" | "column";
  children: ReactNode;
};

const TextContainer = styled.p<TextProps>`
  font-family: sans-serif;
  vertical-align: middle;
  align-self: center;
  margin: auto;
`;

export const Text: React.FC<TextProps> = ({ children }) => {
  return <TextContainer>{children}</TextContainer>;
};
