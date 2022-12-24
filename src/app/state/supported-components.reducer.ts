import {SupportedComponentsModel} from "../model/supported-components.model";
import {createReducer, on} from "@ngrx/store";
import {updateSupportedComponents} from "./supported-components.actions";

export const supportedComponentsInitialState: SupportedComponentsModel = {
  playerHealth: false,
  score: false,
  songStatus: false,
  highScore: false,
  songDetails: false,
  combo: false,
  gameSpecific: false
}

export const supportedComponentsReducer = createReducer(
  supportedComponentsInitialState,
  on(updateSupportedComponents, (state: SupportedComponentsModel, { playerHealth, score, songStatus, highScore, songDetails, combo, gameSpecific }): SupportedComponentsModel => {
    return {
      ...state,
      playerHealth: playerHealth,
      score: score,
      songStatus: songStatus,
      highScore: highScore,
      songDetails: songDetails,
      combo: combo,
      gameSpecific: gameSpecific
    }
  })
);
