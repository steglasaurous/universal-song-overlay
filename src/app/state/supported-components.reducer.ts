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
  gameSpecific: false,
  multiplayer: false
}

export const supportedComponentsReducer = createReducer(
  supportedComponentsInitialState,
  on(updateSupportedComponents, (state: SupportedComponentsModel, supportedComponents: SupportedComponentsModel): SupportedComponentsModel => {
    return supportedComponents;
  })
);
