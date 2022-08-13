import {createReducer, on} from "@ngrx/store";
import {setHidden, setVisible} from "./visible.actions";
import {setSongDone, setSongNotDone} from "./song-done.actions";

export const initialState: boolean = false;

export const songDoneReducer = createReducer(
  initialState,
  on(setSongDone, (state: boolean) => {
    return true;
  }),
  on(setSongNotDone, (state: boolean) => {
    return false;
  })
);
