import {createReducer, on} from "@ngrx/store";
import {clearConnectedGame, setConnectedGame} from "./connected-game.actions";

export const NO_GAME_CONNECTED = "";

export const initialState: string = NO_GAME_CONNECTED;

export const connectedGameReducer = createReducer(
  initialState,
  on(setConnectedGame, (state: string, { gameName }) => {
    return gameName;
  }),
  on(clearConnectedGame, (state: string) => {
    return NO_GAME_CONNECTED;
  })
);
