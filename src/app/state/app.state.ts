import {GameStateModel} from "../model/game-state.model";
import {SupportedComponentsModel} from "../model/supported-components.model";

export interface AppState {
  gameState: GameStateModel,
  isVisible: boolean,
  supportedComponents: SupportedComponentsModel,
  connectedGame: string,
  songDone: boolean // When true, the song is 'finished' - used to know states where isVisible is true, but the song is considered finished and won't get more updates.
}
