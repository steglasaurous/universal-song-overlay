import {createAction, props} from "@ngrx/store";

export const updateMultiplayerState = createAction(
  '[Update multiplayer state]',
  props<{
    scores: { name: string, score: number, gameSpecificData: any }[],
    inProgress: boolean,
    completed: boolean
  }>()
);

export const setMultiVisible = createAction(
  '[Multiplayer set visible]'
);

export const setMultiHidden = createAction(
  '[Multiplayer set hidden]'
);


export const clearMultiplayerState = createAction(
  '[Multiplayer State] Clear status'
);

