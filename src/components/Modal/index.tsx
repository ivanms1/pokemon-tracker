import React from "react";
import { default as LModal } from "react-modal";
import cx from "classnames";

if (typeof window !== "undefined") {
  LModal.setAppElement("body");
}

interface ModalProps extends LModal.Props {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClose: () => void;
  styles?: any;
  withCloseIcon?: boolean;
}

function Modal({
  isOpen,
  children,
  styles: customStyles,
  className,
  onClose,
  ...props
}: ModalProps) {
  return (
    <LModal
      isOpen={isOpen}
      overlayClassName={cx(
        "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
        customStyles?.Overlay
      )}
      bodyOpenClassName={cx(
        "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
        customStyles?.ModalBodyOpen
      )}
      className={cx(
        "absolute bg-white rounded-lg text-left overflow-hidden shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all sm:my-8 sm:max-w-lg sm:w-full",
        className
      )}
      onRequestClose={onClose}
      closeTimeoutMS={300}
      {...props}
    >
      <div
        className={cx(
          "bg-white w-[95vw] sm:w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4",
          customStyles?.Content
        )}
      >
        {children}
      </div>
    </LModal>
  );
}

export default Modal;
