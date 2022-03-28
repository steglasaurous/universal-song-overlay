import {GameStateModel} from "../model/game-state.model";
import {SupportedComponentsModel} from "../model/supported-components.model";

export interface AppState {
  gameState: GameStateModel,
  isVisible: boolean,
  supportedComponents: SupportedComponentsModel
}
