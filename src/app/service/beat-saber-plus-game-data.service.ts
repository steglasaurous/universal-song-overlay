import {AbstractGameDataService} from "./abstract-game-data.service";
import {Store} from "@ngrx/store";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {setHighScore, updateScore, updateSongDetails} from "../state/gamestate.actions";
import {setVisible} from "../state/visible.actions";

export class BeatSaberPlusGameDataService extends AbstractGameDataService {
  constructor(
    store: Store,
    host: string,
    port: number = 2947,
    path: string = "/socket"
  ) {
    super(store, host, port, path);
  }

  getGameName(): string {
    return "beat_saber_plus";
  }

  override processMessage(data: any): void {
    if (data._event) {
      switch (data._event) {
        case "gameState":
          switch (data.gameStateChanged) {
            case "Menu":
              this.hideAndClearGameState();

              break;
            case "Playing":
              this.store.dispatch(setVisible());
              break;
          }
          break;

        case "mapInfo":
          this.store.dispatch(updateSongDetails({
            title: data.mapInfoChanged.name,
            artist: data.mapInfoChanged.artist,
            mapper: data.mapInfoChanged.mapper,
            difficulty: data.mapInfoChanged.difficulty,
            songLength: data.mapInfoChanged.duration,
            extraText: data.mapInfoChanged.BSRKey,
            albumArt: "data:image/png;base64," + data.mapInfoChanged.coverRaw ?? ""
          }));
          // this.store.dispatch(setHighScore({ highScore: data.PreviousRecord }));
          this.store.dispatch(setVisible());

          break;
        case "score":
          // NOTE: BS+ includes 'accuracy' - float between 0 and 1
          // Could be a new feature to display?
          this.store.dispatch(updateScore({
            score: data.scoreEvent.score,
            combo: data.scoreEvent.combo
          }));
          break;

        case "pause":
          break;

        case "resume":
          break;
      }
    }
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
}
