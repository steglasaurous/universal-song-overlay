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
import {SynthRidersGameSpecificData} from "../model/synth-riders-game-specific-data";

export class SynthRidersGameDataService extends AbstractGameDataService
{
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
        break;
    }
  }
}
