import {Injectable} from "@angular/core";
import {GameDataServiceInterface} from "./game-data-service.interface";
import {WebsocketService} from "./websocket.service";
import {updateSupportedComponents} from "../state/supported-components.actions";
import {tap} from "rxjs";
import {
  clearAll, setHighScore,
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../state/gamestate.actions";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";

@Injectable()
export class AudicaGameDataService implements GameDataServiceInterface {
  private host = "localhost";
  private port = 8085;
  private path = '/AudicaStats';

  private websocketService: WebsocketService;

  constructor(
    private store: Store
  ) {
    // FIXME: This is TERRIBLE and probably should be done in a way that's available via
    //        angular configuration.  For now, it works.
    let params = new URLSearchParams(window.location.search);
    if (params.has('websocket_host')) {
      this.host = params.get('websocket_host') ?? "localhost";
    }
    if (params.has('websocket_port')) {
      this.port = parseInt(params.get('websocket_port') ?? "9000");
    }

    this.websocketService = new WebsocketService(this.host, this.port, this.path);
    this.websocketService.connect(
      {
        next: (value) => {
          this.store.dispatch(updateSupportedComponents(this.supports()));
        },
        error: () => {
        },
        complete: () => {
        }
      }
    );

    this.websocketService.messages$.pipe(
      tap((data: any) => {
        switch (data.eventType) {
          case "SongSelected":
            this.store.dispatch(updateSongDetails({
              title: data.data.songName,
              artist: data.data.songArtist,
              mapper: data.data.songAuthor,
              difficulty: data.data.difficulty,
              songLength: data.data.songLengthSeconds,
              extraText: "",
              albumArt: data.data.albumArtData ? 'data:image/png;base64,' + data.data.albumArtData : ""
            }));

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
            this.store.dispatch(clearAll());
            break;
        }
      })
    ).subscribe();

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
      highScore: true
    };
  }

}
