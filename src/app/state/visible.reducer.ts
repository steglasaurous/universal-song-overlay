import {createReducer, on} from "@ngrx/store";
import {hideThenClearGameState, setHidden, setVisible} from "./visible.actions";

export const NO_GAME_CONNECTED = "";

export const initialState: boolean = false;

export const visibleReducer = createReducer(
  initialState,
  on(setVisible, (state: boolean) => {
    return true;
  }),
  on(setHidden, (state: boolean) => {
    return false;
  }),
  on(hideThenClearGameState, (state: boolean) => {


    return false;
  })
);
