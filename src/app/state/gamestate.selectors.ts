import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "./app.state";
import {GameStateModel} from "../model/game-state.model";

export const selectGameStateFeature = createFeatureSelector<GameStateModel>('gameState');

// export const selectGameState = createSelector(
//   selectGameStateFeature,
//   (state:GameStateModel) => state
// );
