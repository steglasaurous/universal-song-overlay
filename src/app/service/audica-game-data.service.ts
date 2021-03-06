import {
  setHighScore,
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../state/gamestate.actions";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";
import {AbstractGameDataService} from "./abstract-game-data.service";
import {setVisible} from "../state/visible.actions";

export class AudicaGameDataService extends AbstractGameDataService {

  constructor(
    store: Store,
    host: string,
    port: number = 8085,
    path: string = "/AudicaStats"
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
    return 'audica';
  }

  override processMessage(data: any) {
    switch (data.eventType) {
      case "SongSelected":
        this.store.dispatch(updateSongDetails({
          // Stripping tags as song audica tunes have <size=60%> type tags in them.
          title: data.data.songName.replace(/(<([^>]+)>)/gi, "").trim(),
          artist: data.data.songArtist.replace(/(<([^>]+)>)/gi, "").trim(),
          mapper: data.data.songAuthor.replace(/(<([^>]+)>)/gi, "").trim(),
          difficulty: data.data.difficulty,
          songLength: data.data.songLengthSeconds,
          extraText: "",
          albumArt: data.data.albumArtData ? 'data:image/png;base64,' + data.data.albumArtData : ""
        }));
        this.store.dispatch(setVisible());

        break;
      case "SongProgress":
        this.store.dispatch(updateSongPosition({
          songPosition: data.data.timeElapsedSeconds
        }));
        break;
      case "SongPlayerStatus":
        this.store.dispatch(updateScore({
          score: data.data.score,
          combo: data.data.streak,
          multiplier: data.data.scoreMultiplier
        }));

        this.store.dispatch(setHighScore({
          highScore: data.data.highScore
        }));

        this.store.dispatch(updatePlayerHealth({
          playerHealth: Math.floor(data.data.health * 100)
        }));
        break;
      case "ReturnToSongList":
        this.hideAndClearGameState();
        break;
    }
  }
}
