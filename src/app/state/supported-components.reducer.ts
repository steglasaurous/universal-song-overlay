import {SupportedComponentsModel} from "../model/supported-components.model";
import {createReducer, on} from "@ngrx/store";
import {updateSupportedComponents} from "./supported-components.actions";

export const supportedComponentsInitialState: SupportedComponentsModel = {
  playerHealth: false,
  score: false,
  songStatus: false,
  highScore: false,
  songDetails: false
}

export const supportedComponentsReducer = createReducer(
  supportedComponentsInitialState,
  on(updateSupportedComponents, (state: SupportedComponentsModel, { playerHealth, score, songStatus, highScore, songDetails }): SupportedComponentsModel => {

    let newState = {
      ...state,
      playerHealth: playerHealth,
      score: score,
      songStatus: songStatus,
      highScore: highScore,
      songDetails: songDetails
    };
    console.log("reducer");
    console.log(newState);
    return {
      ...state,
      playerHealth: playerHealth,
      score: score,
      songStatus: songStatus,
      highScore: highScore,
      songDetails: songDetails
    }
  })
);
