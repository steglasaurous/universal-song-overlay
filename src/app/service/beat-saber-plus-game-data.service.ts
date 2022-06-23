import {AbstractGameDataService} from "./abstract-game-data.service";
import {Store} from "@ngrx/store";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {incrementSongPosition, setHighScore, updateScore, updateSongDetails} from "../state/gamestate.actions";
import {setVisible} from "../state/visible.actions";
import {selectGameStateFeature} from "../state/gamestate.selectors";
import {GameStateModel} from "../model/game-state.model";

export class BeatSaberPlusGameDataService extends AbstractGameDataService {
  private songProgressTimerHandle: any = null;

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
    // FIXME: Song progress isn't reported regularly by the server, just playing, pause and resume events.  Sounds like
    //        it's up to me to 'fake' the progress via timers.

    if (data._event) {
      switch (data._event) {
        case "gameState":
          switch (data.gameStateChanged) {
            case "Menu":
              this.stopSongProgressTimer();
              this.hideAndClearGameState();
              break;
            case "Playing":
              this.store.dispatch(setVisible());
              // FIXME: BS+ only shares when a song starts or pauses, so while it's playing,
              //        we need to effectively fake song progress updates.
              this.startSongProgressTimer();
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
          // FIXME: Stop timer of song progress, and update
          //        based on stop time sent in this event
          this.stopSongProgressTimer();
          break;

        case "resume":
          // FIXME: Restart timer of song progress
          this.startSongProgressTimer();
          break;
      }
    }
  }

  private startSongProgressTimer() {
    this.songProgressTimerHandle = setInterval(() => {
      this.store.dispatch(incrementSongPosition())
    },1000);
  }

  private stopSongProgressTimer() {
    clearInterval(this.songProgressTimerHandle);
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
