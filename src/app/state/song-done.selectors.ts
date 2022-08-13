import {createFeatureSelector} from "@ngrx/store";

export const selectSongDone = createFeatureSelector<boolean>('songDone');
