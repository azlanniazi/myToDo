import { Fragment, ReactElement } from "react";
import { createPortal } from "react-dom";

import classes from "../../assets/style/UI/modal.module.css";

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

interface ModalOverlayProps {
  children: JSX.Element | JSX.Element[];
  style:
    | {
        background: string;
        top?: string;
        left?: string;
      }
    | undefined;
}

const ModalOverlay = ({ children, style }: ModalOverlayProps) => {
  return (
    <div className={classes.modal} style={style}>
      {children}
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  style?: {
    background: string;
    top?: string;
    left?: string;
  };
  onClose: () => void | undefined;
}
const Modal = ({ children, onClose, style }: ModalProps) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay style={style}>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
