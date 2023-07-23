import { createContext, useContext, useReducer } from "react";
import { BottomSheetReducer } from "./BottomSheetReducer";
import {
  BottomSheetContextType,
  BottomSheetProviderProps,
} from "../../types/bottom_sheet";

const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
);

export function useSheet() {
  return useContext(BottomSheetContext);
}

export function BottomSheetProvider({ children }: BottomSheetProviderProps) {
  const [state, dispatch] = useReducer(BottomSheetReducer, {
    bottomSheetOpen: false,
    isOverlayVisible: false,
  });

  function toggleBottomSheet() {
    dispatch({ type: "TOGGLE_BOTTOM_SHEET" });
  }

  function toggleOverlay() {
    dispatch({ type: "TOGGLE_OVERLAY" });
  }

  const values: BottomSheetContextType = {
    state,
    dispatch,
    toggleBottomSheet,
    toggleOverlay,
  };

  return (
    <BottomSheetContext.Provider value={values}>
      {children}
    </BottomSheetContext.Provider>
  );
}
