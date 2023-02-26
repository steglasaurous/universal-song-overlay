import {createReducer, on} from "@ngrx/store";
import {
  updateMultiplayerState,
} from "./gamestate.actions";
import {MultiplayerStateModel} from "../model/multiplayer-state.model";
import {clearMultiplayerState} from "./multiplayerstate.actions";

export const initialState: MultiplayerStateModel = {
  scores: [],
  inProgress: false,
  completed: false,
}

export const multiplayerStateReducer = createReducer(
  initialState,

  on(updateMultiplayerState, (state: MultiplayerStateModel, {
    scores,
    inProgress,
    completed
  }): MultiplayerStateModel => {
    return {
      ...state,
        scores: scores,
        inProgress: inProgress,
        completed: completed
    }
  }),
  on(clearMultiplayerState, (state: MultiplayerStateModel) => {
    return initialState;
  })
);

