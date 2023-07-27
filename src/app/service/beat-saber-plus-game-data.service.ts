import {AbstractGameDataService} from "./abstract-game-data.service";
import {Store} from "@ngrx/store";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {updatePlayerHealth, updateScore, updateSongDetails, updateSongPosition} from "../state/gamestate.actions";
import {setVisible} from "../state/visible.actions";

export class BeatSaberPlusGameDataService extends AbstractGameDataService {
  private songData!: any;
  private songPosition = 0;
  private songDuration = 0;
  private timerHandle!: any;
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

  processMessage(data: any): void {
    switch (data._event) {
      case 'mapInfo':
        this.songData = data.mapInfoChanged;
        break;
      case 'gameState':
        switch (data.gameStateChanged) {
          case 'Menu':
            clearInterval(this.timerHandle);
            this.hideAndClearGameState();
            break;
          case 'Playing':
            this.store.dispatch(updateSongDetails({
              title: this.songData.name,
              artist: this.songData.artist,
              mapper: this.songData.mapper,
              difficulty: this.songData.difficulty,
              songLength: this.songData.duration / 1000,
              extraText: this.songData.BSRKey ? "BSR " + this.songData.BSRKey : '',
              albumArt: this.songData.coverRaw ? 'data:image/png;base64,' + this.songData.coverRaw : ''
            }));
            this.store.dispatch(setVisible());
            this.songPosition = 0;
            this.songDuration = this.songData.duration / 1000;
            break;
        }
        break;
      case 'pause':
        clearInterval(this.timerHandle);
        this.songPosition = data.pauseTime;
        this.store.dispatch(updateSongPosition({
          songPosition: this.songPosition
        }));
        break;
      case 'resume':
        this.timerHandle = setInterval(this.incrementTime.bind(this), 1000);
        break;
      case 'score':
        let score = data.scoreEvent.score;

        // If nofail is on, the score is halved in-game, but BSPlus still reports
        // original score.  This is to make it match what's displayed in-game.
        if (data.scoreEvent.currentHealth <= 0) {
          score = Math.floor(score / 2);
        }
        this.store.dispatch(updateScore({
          score: score,
          combo: data.scoreEvent.combo,
          multiplier: 1
        }));
        this.store.dispatch(updatePlayerHealth({
          playerHealth: data.scoreEvent.currentHealth * 100
        }));
        break;

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

  incrementTime() {
    if (this.songPosition >= this.songDuration) {
      return;
    }
    this.songPosition++;
    this.store.dispatch(updateSongPosition({
      songPosition: this.songPosition
    }));
  }
}
