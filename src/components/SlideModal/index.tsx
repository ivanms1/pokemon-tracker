import React from "react";
import { default as LModal } from "react-modal";
import cx from "classnames";

if (typeof window !== "undefined") {
  LModal.setAppElement("body");
}

interface SlideModal extends LModal.Props {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
  contentClass?: string;
  onClose: () => void;
  styles?: any;
  withCloseIcon?: boolean;
}

function SlideModal({
  isOpen,
  children,
  styles: customStyles,
  className,
  contentClass,
  onClose,
  ...props
}: SlideModal) {
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
        "absolute bg-white text-left h-screen overflow-hidden shadow-xl right-0 transform transition-all w-screen sm:max-w-lg ",
        className
      )}
      onRequestClose={onClose}
      {...props}
    >
      <div
        className={cx("bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", contentClass)}
      >
        {children}
      </div>
    </LModal>
  );
}

export default SlideModal;
