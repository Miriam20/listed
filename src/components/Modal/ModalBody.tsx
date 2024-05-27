import { ReactNode } from "react";
import BSModal from "react-bootstrap/Modal";

type ModalBodyProps = {
  children: ReactNode;
};

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <BSModal.Body>{children}</BSModal.Body>;
};

export default ModalBody;
