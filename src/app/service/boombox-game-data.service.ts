import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";
import {
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../state/gamestate.actions";
import {AbstractGameDataService} from "./abstract-game-data.service";
import {setVisible} from "../state/visible.actions";
import {setSongNotDone} from "../state/song-done.actions";

// NOTE: According to boombox docs, the websocket is only available locally on the PC running the game.  This won't
// work on a 2-PC stream setup.  May need to do something like some kind of websocket proxy, or have streamerbot
// forward messages on their behalf.
export class BoomboxGameDataService extends AbstractGameDataService
{
  // Temporary storage of song data while map is being selected.
  private songData: any;

  constructor(
    store: Store,
    host: string,
    port: number = 42338,
    path: string = "/socket"
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
      combo: true,
      multiplier: true
    };
  }

  getGameName(): string {
    return 'boombox';
  }

  override processMessage(data: any) {
    switch (data._event) {
      // FIXME: Implement handshake event for initial connection
      case "mapInfo":
        // This gets triggered as soon as a map is selected, but are still in the Lobby.
        // We store the song data locally in this instance until the game starts.
        // Once the game starts, we dispatch the update to the store.
        // Possible future improvement: In the store, differentiate between setting data and
        // determining when to show or hide the overlay.

        this.songData = data.mapInfoChanged; // FIXME: Put this into a structured form?

        break;
      case "gameState":
        if (data.gameStateChanged == "Lobby") {
          this.hideAndClearGameState();
        } else if (data.gameStateChanged == "InGame") {
          this.store.dispatch(updateSongDetails({
            title: this.songData.name,
            artist: this.songData.artist,
            mapper: this.songData.mapper,
            difficulty: this.songData.difficulty,
            songLength: this.songData.duration,
            extraText: "",
            //albumArt: this.songData.coverRaw // Boombox says not yet implemented
          }));
          this.store.dispatch(setSongNotDone());
          this.store.dispatch(setVisible());
        }
        break;

      case "songTime":
        this.store.dispatch(updateSongPosition({
          songPosition: data.songTimeChanged
        }));
        break;
      case "score":
        if (data.scoreEvent.isLocalPlayer) { // Only report on local player if in a multiplayer setting
          this.store.dispatch(updateScore({
            score: data.scoreEvent.score,
            combo: data.scoreEvent.combo,
            //multiplier: data.data.multiplier
          }));
          this.store.dispatch(updatePlayerHealth({
            playerHealth: Math.floor(data.scoreEvent.currentHealth / data.scoreEvent.maxHealth * 100)
          }));
        }
        break;
    }
  }
}
