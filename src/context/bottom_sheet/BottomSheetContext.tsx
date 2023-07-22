import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useState,
  SetStateAction,
} from "react";
import { BottomSheetReducer } from "./BottomSheetReducer";
import {
  BottomSheetProviderProps,
  SheetAction,
  SheetState,
} from "../../types/bottom_sheet";

interface BottomSheetContextType {
  state: SheetState;
  dispatch: Dispatch<SheetAction>;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  toggleBottomSheet: () => void;
  toggleOverlay: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
);

export function useSheet() {
  return useContext(BottomSheetContext);
}

export function BottomSheetProvider({ children }: BottomSheetProviderProps) {
  const [selectedOption, setSelectedOption] = useState("VerfiedAndUnverified");
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
    selectedOption,
    setSelectedOption,
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
