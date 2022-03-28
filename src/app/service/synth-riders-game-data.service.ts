import {GameDataServiceInterface} from "./game-data-service.interface";
import {Observable, Subject, tap} from "rxjs";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {WebsocketService} from "./websocket.service";
import {
  clearAll,
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../state/gamestate.actions";
import {updateSupportedComponents} from "../state/supported-components.actions";

@Injectable()
export class SynthRidersGameDataService implements GameDataServiceInterface
{
  private host = "localhost";
  private port = 9000;

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
    this.websocketService = new WebsocketService(this.host, this.port);
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
          case "SongStart":
            this.store.dispatch(updateSongDetails({
              title: data.data.song,
              artist: data.data.author,
              mapper: data.data.beatMapper,
              difficulty: data.data.difficulty,
              songLength: data.data.length,
              extraText: "",
              albumArt: data.data.albumArt ?? null
            }));

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
            // FIXME: This only works if song completes normally.  If it's quit,
            // the websocket server doesn't tell us.  YET.
            this.store.dispatch(clearAll());
            break;
          case "SceneChange":
            if (data.data.sceneName == '3.GameEnd') {
              this.store.dispatch(clearAll());
            }
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
      highScore: false
    };
  }

}
