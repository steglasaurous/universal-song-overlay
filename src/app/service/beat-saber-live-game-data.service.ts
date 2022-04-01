import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";
import {
  updatePlayerHealth,
  updateScore,
  updateSongPosition
} from "../state/gamestate.actions";
import {AbstractGameDataService} from "./abstract-game-data.service";

export class BeatSaberLiveGameDataService extends AbstractGameDataService
{
  constructor(
    store: Store,
    host: string,
    port: number = 2946,
    path: string = "/BSDataPuller/LiveData"
  ) {
    super(store, host, port, path);
  }

  isConnected(): boolean {
    return this.websocketService.isConnected;
  }

  supports(): SupportedComponentsModel {
    return {
      songDetails: true,
      songStatus: true,
      playerHealth: true,
      score: true,
      highScore: false,
      combo: true
    };
  }

  getGameName(): string {
    return 'beat_saber';
  }

  override processMessage(data: any) {
    this.store.dispatch(updateScore({
      score: data.ScoreWithMultipliers,
      combo: data.Combo
    }));

    this.store.dispatch(updatePlayerHealth({
      playerHealth: data.PlayerHealth
    }));

    this.store.dispatch(updateSongPosition({
      songPosition: data.TimeElapsed
    }));
  }
}
