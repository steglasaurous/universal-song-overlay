import {createAction, props} from "@ngrx/store";

export const setConnectedGame = createAction('[Connected game]',props<{
  gameName: string
}>());

export const clearConnectedGame = createAction('[Clear connected game]');

