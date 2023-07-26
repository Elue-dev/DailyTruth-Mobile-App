import { createContext, useContext, useState } from "react";
import { AlertArgs, AlertProviderProps, AlertState } from "../../types/alert";

const ModalContext = createContext<AlertState>({} as AlertState);

export function useAlert() {
  return useContext(ModalContext);
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  function showAlertAndContent({ type, message, timeout }: AlertArgs) {
    setType(type);
    setShowAlert(true);
    setMessage(message);
    setTimeout(() => setShowAlert(false), timeout || 4000);
  }

  function closeAlert() {
    setShowAlert(false);
  }

  const values: AlertState = {
    showAlert,
    type,
    message,
    setShowAlert,
    showAlertAndContent,
    closeAlert,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}
