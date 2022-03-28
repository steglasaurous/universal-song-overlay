import {createAction, props} from "@ngrx/store";

export const updateSupportedComponents = createAction(
  'Update supported actions',
  props<{
    songDetails: boolean,
  songStatus: boolean,
  playerHealth: boolean,
  score: boolean,
  highScore: boolean
  }>()
);
