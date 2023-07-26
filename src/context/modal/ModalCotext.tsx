import { createContext, useContext, useState } from "react";
import { ModalArgs, ModalProviderProps, ModalState } from "../../types/modal";

const ModalContext = createContext<ModalState>({} as ModalState);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [actionBtnText, setActionBtnText] = useState("");

  function showModalAndContent({ title, message, actionBtnText }: ModalArgs) {
    setShowModal(true);
    setTitle(title);
    setMessage(message);
    setActionBtnText(actionBtnText);
  }

  function closeModal() {
    setShowModal(false);
  }

  const values: ModalState = {
    showModal,
    title,
    message,
    actionBtnText,
    setShowModal,
    showModalAndContent,
    closeModal,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}
