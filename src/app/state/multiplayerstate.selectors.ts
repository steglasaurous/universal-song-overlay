import {createFeatureSelector} from "@ngrx/store";
import {MultiplayerStateModel} from "../model/multiplayer-state.model";

export const selectMultiplayerState = createFeatureSelector<MultiplayerStateModel>('multiplayerState');

