import { Dispatch, ReactNode, SetStateAction } from "react";
import { News } from "../news";

export interface BottomSheetProviderProps {
  children: ReactNode;
}

export interface BottomSheetContextType {
  state: SheetState;
  dispatch: Dispatch<SheetAction>;
  toggleBottomSheet: () => void;
  toggleOverlay: () => void;
}

export interface SheetState {
  bottomSheetOpen: boolean;
  isOverlayVisible: boolean;
}

export type SheetAction =
  | { type: "TOGGLE_BOTTOM_SHEET" }
  | { type: "TOGGLE_OVERLAY" };

export interface BottomSheetProps {
  setDataToUse: Dispatch<SetStateAction<News[]>>;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}