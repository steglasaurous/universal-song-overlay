import {createFeatureSelector} from "@ngrx/store";

export const selectConnectedGame = createFeatureSelector<string>('connectedGame');
