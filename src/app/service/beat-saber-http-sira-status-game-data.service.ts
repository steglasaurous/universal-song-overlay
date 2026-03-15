import {AbstractGameDataService} from "./abstract-game-data.service";
import {Store} from "@ngrx/store";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../state/gamestate.actions";
import {setVisible} from "../state/visible.actions";

export class BeatSaberHttpSiraStatusGameDataService extends AbstractGameDataService {

  constructor(
    store: Store,
    host: string,
    port: number = 6557,
    path: string = "/socket"
  ) {
    super(store, host, port, path);
  }

  getGameName(): string {
    // Treat this as regular Beat Saber for the purposes of "connected game"
    return "beat_saber";
  }

  override processMessage(data: any): void {
    if (!data || !data.event) {
      return;
    }

    const status = data.status || {};
    const beatmap = status.beatmap;
    const performance = status.performance;

    switch (data.event) {
      case "hello":
      case "songStart":
        if (beatmap) {
          let albumArt: string | undefined;
          if (beatmap.songCover) {
            albumArt = "data:image/png;base64," + beatmap.songCover;
          }

          this.store.dispatch(updateSongDetails({
            title: beatmap.songName,
            artist: beatmap.songAuthorName,
            mapper: beatmap.levelAuthorName,
            difficulty: beatmap.difficulty,
            songLength: beatmap.length ? beatmap.length / 1000 : 0,
            extraText: beatmap.songHash ?? "",
            albumArt: albumArt
          }));

          this.store.dispatch(updateSongPosition({ songPosition: 0 }));
          this.store.dispatch(updateScore({ score: 0, combo: 0, multiplier: performance?.multiplier }));
          this.store.dispatch(setVisible());
        }
        break;

      case "scoreChanged":
      case "noteCut":
      case "noteFullyCut":
      case "noteMissed":
      case "bombCut":
      case "bombMissed":
      case "obstacleEnter":
      case "obstacleExit":
        if (performance) {
          if (typeof performance.score === "number" || typeof performance.combo === "number") {
            this.store.dispatch(updateScore({
              score: performance.score,
              combo: performance.combo,
              multiplier: performance.multiplier
            }));
          }

          if (typeof performance.currentSongTime === "number") {
            this.store.dispatch(updateSongPosition({
              songPosition: performance.currentSongTime
            }));
          }
        }
        break;

      case "finished":
      case "failed":
      case "menu":
        this.hideAndClearGameState();
        break;
    }
  }

  supports(): SupportedComponentsModel {
    return {
      songDetails: true,
      songStatus: true,
      playerHealth: false,
      score: true,
      highScore: false,
      combo: true,
      multiplier: true
    };
  }
}

