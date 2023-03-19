import {createReducer, on} from "@ngrx/store";
import {
  updateMultiplayerState,
} from "./gamestate.actions";
import {MultiplayerStateModel} from "../model/multiplayer-state.model";
import {clearMultiplayerState, setMultiHidden} from "./multiplayerstate.actions";

export const initialState: MultiplayerStateModel = {
  scores: [],
  inProgress: false,
  completed: false,
  visible: false
}

export const multiplayerStateReducer = createReducer(
  initialState,

  on(updateMultiplayerState, (state: MultiplayerStateModel, {
    scores,
    inProgress,
    completed,
    visible
  }): MultiplayerStateModel => {
    return {
      ...state,
        scores: scores,
        inProgress: inProgress,
        completed: completed,
        visible: visible
    }
  }),
  on(clearMultiplayerState, (state: MultiplayerStateModel) => {
    return initialState;
  }),
  on(setMultiHidden, (state: MultiplayerStateModel) => {
    return {
      ...state,
      visible: false
    };
  }) // FIXME: Add reducer for setMultiVisible
);

