import {createAction, props} from "@ngrx/store";

export const setVisible = createAction('[Visible]');

export const setHidden = createAction('[Invisible]');

export const hideThenClearGameState = createAction('[Hide then clear game state]');
