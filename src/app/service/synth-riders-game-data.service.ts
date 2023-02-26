import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";
import {
  updateMultiplayerState,
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../state/gamestate.actions";
import {AbstractGameDataService} from "./abstract-game-data.service";
import {setVisible} from "../state/visible.actions";
import {SynthRidersGameSpecificData} from "../model/synth-riders-game-specific-data";
import {SynthRidersMultiGameSpecificDataModel} from "../model/synth-riders-multi-game-specific-data.model";

export class SynthRidersGameDataService extends AbstractGameDataService {
  static readonly GAME_NAME = 'synth_riders';

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
      highScore: false,
      combo: true,
      gameSpecific: true
    };
  }

  getGameName(): string {
    return SynthRidersGameDataService.GAME_NAME;
  }

  override processMessage(data: any) {

    switch (data.eventType) {
      case "SongStart":
        console.log(data);
        this.store.dispatch(updateSongDetails({
          title: data.data.song,
          artist: data.data.author,
          mapper: data.data.beatMapper,
          difficulty: data.data.difficulty,
          songLength: data.data.length,
          extraText: "",
          albumArt: data.data.albumArt ?? null,
          gameSpecificData: {
            noFailEnabled: data.data.noFailEnabled ?? false,
            spinEnabled: data.data.spinEnabled ?? false,
            spinMode: data.data.spinMode ?? -1,
            spinIntensity: data.data.spinIntensity ?? -1,
            spiralEnabled: data.data.spiralEnabled ?? false,
            spiralIntensity: data.data.spiralIntensity ?? 0,
            obstaclesEnabled: data.data.obstaclesEnabled ?? true,
            noteJumpSpeed: data.data.noteJumpSpeed ?? 0,
            suddenDeathEnabled: data.data.suddenDeathEnabled ?? false,
            vanishNotesEnabled: data.data.vanishNotesEnabled ?? false,
            prismaticNotesEnabled: data.data.prismaticNotesEnabled ?? false,
            noteSize: data.data.noteSize ?? 0,
            oneHandModeEnabled: data.data.oneHandModeEnabled ?? false,
            isExperienceStage: data.data.isExperienceStage ?? false,
            isForceMode: data.data.isForceMode ?? false,
            haloEnabled: data.data.haloEnabled ?? false
          } as SynthRidersGameSpecificData
        }));
        this.store.dispatch(setVisible());

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
        this.hideAndClearGameState();
        break;
      case "SceneChange":
        if (data.data.sceneName == '3.GameEnd') {
          this.hideAndClearGameState();
        }

        // Can add something for multi when returning to the room to clear
        // the game state.
        break;
      case "MultiLiveScore":
        console.log("MultiLiveScore");
        console.log(data);
        this.store.dispatch(updateMultiplayerState({
          scores: data.data.scores,
          inProgress: true,
          completed: false
        }));
        break;
      case "MultiFinalScores":
        console.log("MultiFinalScores");
        console.log(data);
        let scores = [];
        if (data.data.scores instanceof Array) {
          for (const score of data.data.scores) {
            scores.push({
              name: score.name,
              score: score.score,
              gameSpecificData: {
                perfectHits: score.perfectHits,
                perfectScore: score.perfectScore,
                goodHits: score.goodHits,
                goodScore: score.goodScore,
                poorHits: score.poorHits,
                poorScore: score.poorScore,
                totalNotes: score.totalNotes,
                longestStreak: score.longestStreak,
                specialsComplete: score.specialsComplete,
                totalSpecials: score.totalSpecials,
                maxMultiplier: score.maxMultiplier
              } as SynthRidersMultiGameSpecificDataModel
            });
          }
          // Sort the scores highest to lowest.
          scores.sort((a, b) => {
            if (a.score === b.score) {
              return 0;
            } else {
              return (a.score < b.score) ? 1 : -1;
            }
          });

          this.store.dispatch(updateMultiplayerState({
            scores: scores,
            inProgress: false,
            completed: true
          }));
        }

        break;
    }
  }
}
