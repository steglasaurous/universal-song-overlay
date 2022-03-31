import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";
import {
  clearAll,
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../state/gamestate.actions";
import {AbstractGameDataService} from "./abstract-game-data.service";

export class SynthRidersGameDataService extends AbstractGameDataService
{
  constructor(
    store: Store,
    host: string,
    port: number = 9000,
    path: string = "/"
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
      highScore: false
    };
  }

  getGameName(): string {
    return 'synth_riders';
  }

  override processMessage(data: any) {
    switch (data.eventType) {
      case "SongStart":
        this.store.dispatch(updateSongDetails({
          title: data.data.song,
          artist: data.data.author,
          mapper: data.data.beatMapper,
          difficulty: data.data.difficulty,
          songLength: data.data.length,
          extraText: "",
          albumArt: data.data.albumArt ?? null
        }));

        break;
      case "PlayTime":
        this.store.dispatch(updateSongPosition({
          songPosition: Math.floor(data.data.playTimeMS / 1000)
        }));
        break;
      case "NoteHit":
        this.store.dispatch(updateScore({
          score: data.data.score,
          combo: data.data.combo,
          multiplier: data.data.multiplier
        }));
        this.store.dispatch(updatePlayerHealth({
          playerHealth: Math.floor(data.data.lifeBarPercent * 100)
        }));
        break;
      case "NoteMiss":
        this.store.dispatch(updateScore({
          multiplier: data.data.multiplier,
          combo: 0
        }));
        this.store.dispatch(updatePlayerHealth({
          playerHealth: Math.floor(data.data.lifeBarPercent * 100)
        }));
        break;
      case "ReturnToMenu":
        this.store.dispatch(clearAll());
        break;
      case "SceneChange":
        if (data.data.sceneName == '3.GameEnd') {
          this.store.dispatch(clearAll());
        }
        break;
    }
  }
}
