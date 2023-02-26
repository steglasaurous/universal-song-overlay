import {GameStateModel} from "../model/game-state.model";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {MultiplayerStateModel} from "../model/multiplayer-state.model";

export interface AppState {
  gameState: GameStateModel;
  isVisible: boolean;
  supportedComponents: SupportedComponentsModel;
  connectedGame: string;
  multiplayerState: MultiplayerStateModel;
}
