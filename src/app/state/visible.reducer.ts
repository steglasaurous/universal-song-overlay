import {createReducer, on} from "@ngrx/store";
import {setHidden, setVisible} from "./visible.actions";

export const initialState: boolean = false;

export const visibleReducer = createReducer(
  initialState,
  on(setVisible, (state: boolean) => {
    return true;
  }),
  on(setHidden, (state: boolean) => {
    return false;
  })
);
