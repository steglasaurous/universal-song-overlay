import {createFeatureSelector} from "@ngrx/store";

export const selectVisible = createFeatureSelector<boolean>('isVisible');
