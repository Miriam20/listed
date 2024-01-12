import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import classnames from "classnames";

type FlexProps = {
  row?: boolean;
  contentClassName?: string;
  children: ReactNode;
};

const FlexContainer = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
`;

const Flex: React.FC<FlexProps> = (props: FlexProps) => {
  return (
    <FlexContainer
      {...props}
      row={props.row}
      className={classnames(props.contentClassName)}
    />
  );
};

export default Flex;
