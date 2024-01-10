import React, { ReactNode } from "react";
import styles from "../../styles/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="flex items-center justify-center mt-8">
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
