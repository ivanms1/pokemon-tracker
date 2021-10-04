import React from "react";
import { default as LModal } from "react-modal";
import classNames from "classnames";

if (typeof window !== "undefined") {
  LModal.setAppElement("body");
}

interface SlideModal extends LModal.Props {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClose: () => void;
  styles?: any;
  withCloseIcon?: boolean;
}

function SlideModal({
  isOpen,
  children,
  styles: customStyles,
  className,
  onClose,
  ...props
}: SlideModal) {
  return (
    <LModal
      isOpen={isOpen}
      overlayClassName={classNames(
        "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
        customStyles?.Overlay
      )}
      bodyOpenClassName={classNames(
        "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
        customStyles?.ModalBodyOpen
      )}
      className={classNames(
        "absolute bg-white text-left h-screen overflow-hidden shadow-xl right-0 transform transition-all sm:max-w-lg sm:w-full",
        className
      )}
      onRequestClose={onClose}
      {...props}
    >
      <div
        className={classNames(
          "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4",
          customStyles?.Content
        )}
      >
        {children}
      </div>
    </LModal>
  );
}

export default SlideModal;
