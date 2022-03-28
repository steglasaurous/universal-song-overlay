import {createAction, props} from "@ngrx/store";

export const updateSongDetails = createAction(
  '[Song Details] Update Song Details',
  props<{
    title: string,
    artist: string,
    mapper: string,
    difficulty: string,
    songLength: number,
    extraText: string,
    albumArt?: string
  }>()
);

export const updateSongPosition = createAction(
  '[Song Status] Update Song Status',
  props<{
    songPosition: number
  }>()
);
export const clearAll = createAction(
  '[Game State] Clear status'
);

export const updateScore = createAction(
  '[Update score]',
  props<{
    score?: number,
    combo?: number,
    multiplier?: number
  }>()
);

export const setHighScore = createAction(
  '[Set high score]',
  props<{
    highScore: number
  }>()
);

export const updatePlayerHealth = createAction(
  '[Update player health]',
  props<{
    playerHealth: number
  }>()
);
