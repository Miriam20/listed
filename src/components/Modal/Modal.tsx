import { ReactNode } from "react";
import BSModal from "react-bootstrap/Modal";

type ModalProps = {
  children: ReactNode;
  title: string;
  show: boolean;
  close: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  show,
  close,
  children,
}: ModalProps) => {
  return (
    <BSModal show={show} onHide={close}>
      <BSModal.Header closeButton>
        <BSModal.Title>{title}</BSModal.Title>
      </BSModal.Header>
      {children}
    </BSModal>
  );
};

export default Modal;
