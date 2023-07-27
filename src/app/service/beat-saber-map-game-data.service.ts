import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";
import {
  setHighScore,
  updateSongDetails,
} from "../state/gamestate.actions";
import {AbstractGameDataService} from "./abstract-game-data.service";
import {setVisible} from "../state/visible.actions";

export class BeatSaberMapGameDataService extends AbstractGameDataService
{
  private inLevel: boolean = false;

  constructor(
    store: Store,
    host: string,
    port: number = 2946,
    path: string = "/BSDataPuller/MapData"
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
      highScore: true,
      combo: true,
      multiplier: true
    };
  }

  getGameName(): string {
    return 'beat_saber';
  }

  override processMessage(data: any) {
    if (data.InLevel == true) {
      this.store.dispatch(updateSongDetails({
        title: data.SongName,
        artist: data.SongAuthor,
        mapper: data.Mapper,
        difficulty: data.Difficulty,
        songLength: data.Duration,
        extraText: data.BSRKey ? 'BSR ' + data.BSRKey : '',
        albumArt: data.CoverImage ?? ""
      }));
      this.store.dispatch(setHighScore({ highScore: data.PreviousRecord }));
      this.store.dispatch(setVisible());
      this.inLevel = data.InLevel;
    } else if (data.InLevel !== this.inLevel && data.InLevel == false) {
      this.hideAndClearGameState();
      this.inLevel = data.InLevel;
    }
  }
}
