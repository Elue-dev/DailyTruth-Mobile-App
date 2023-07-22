import { ReactNode } from "react";

export interface BottomSheetProviderProps {
  children: ReactNode;
}

export interface SheetState {
  bottomSheetOpen: boolean;
  isOverlayVisible: boolean;
}

export type SheetAction =
  | { type: "TOGGLE_BOTTOM_SHEET" }
  | { type: "TOGGLE_OVERLAY" };
