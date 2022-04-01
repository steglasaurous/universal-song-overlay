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
import {selectGameStateFeature} from "../state/gamestate.selectors";
import {GameStateModel} from "../model/game-state.model";
import {initialState} from "../state/gamestate.reducer";

export class AudioTripGameDataService extends AbstractGameDataService
{
  private gameState$ = this.store.select(selectGameStateFeature);
  private gameState: GameStateModel = initialState;

  constructor(
    store: Store,
    host: string,
    port: number = 48998,
    path: string = "/"
  ) {
    super(store, host, port, path);

    this.gameState$.subscribe({
      next: (gameState: GameStateModel) => {
        this.gameState = gameState;
      }
    });
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
      combo: false
    };
  }

  getGameName(): string {
    return 'audio_trip';
  }

  override processMessage(data: any) {
    // Audio trip barfs out messages every 50ms of the same data structure.
    // We have to be a little smart in what we update so we're not slamming our
    // app with needless updates.

    if (data.inSong == true) {
      if (this.gameState.title != data.songTitle) {
        this.store.dispatch(updateSongDetails({
          title: data.data.songTitle,
          artist: data.data.songArtist,
          mapper: data.data.choreographer,
          difficulty: data.data.choreoName,
          songLength: data.data.songLength,
          extraText: "",
          albumArt: ""
        }));
      }

      this.store.dispatch(updateSongPosition({
        songPosition: data.curSongTime
      }));
      this.store.dispatch(updateScore({
        score: data.score,
        //combo: data.data.combo,
        multiplier: data.multiplier
      }));

      if (data.playerHealth != -1) {
        this.store.dispatch(updatePlayerHealth({
          playerHealth: Math.floor(data.playerHealth * 100)
        }));
      }
    } else {
      if (this.gameState.title) {
        this.store.dispatch(clearAll());
      }
    }
  }
}