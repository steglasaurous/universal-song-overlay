import {Store} from "@ngrx/store";
import {SupportedComponentsModel} from "../model/supported-components.model";
import {selectConnectedGame} from "../state/connected-game.selectors";
import {NO_GAME_CONNECTED} from "../state/connected-game.reducer";
import {WebsocketService} from "./websocket.service";
import {clearConnectedGame, setConnectedGame} from "../state/connected-game.actions";
import {updateSupportedComponents} from "../state/supported-components.actions";
import {tap} from "rxjs";

export abstract class AbstractGameDataService {
  // Make this an array of websocket services?
  protected websocketService: WebsocketService;
  protected connectedGame$ = this.store.select(selectConnectedGame);
  protected connectedGame: string = NO_GAME_CONNECTED;

  protected constructor(
    protected store: Store,
    protected host: string,
    protected port: number = 9000, // Mash this into a 'configuration' object?
    protected path: string = "/"
  ) {


    this.websocketService = new WebsocketService(this.host, this.port, this.path);
    this.websocketService.connect(
      {
        next: (value) => {
          this.store.dispatch(setConnectedGame({ gameName: this.getGameName() }));
          this.store.dispatch(updateSupportedComponents(this.supports()));
        },
        error: () => {},
        complete: () => {}
      }, () => {
        // Only clear the connected game if current game name matches.
        // This function gets called when the connection legit closes OR on
        // retry fails, so needs to handle that accordingly.
        if (this.connectedGame === this.getGameName()) {
          this.store.dispatch(clearConnectedGame());
        }
      }
    );

    this.connectedGame$.subscribe({
      next: (gameName) => {
        this.connectedGame = gameName;
        if (this.connectedGame != this.getGameName() && gameName != undefined && gameName != NO_GAME_CONNECTED) {
          // Another game connected.  Disable retries for now.
          this.websocketService.isRetryEnabled = false;
        } else if (this.connectedGame == NO_GAME_CONNECTED) {
          // No game is connected now.  Start looking for connections if we're not already.
          if (this.websocketService.isRetryEnabled != true) {
            this.websocketService.isRetryEnabled = true;
            this.websocketService.reconnect();
          }
        }
      }
    });

    this.websocketService.messages$.pipe(tap(this.processMessage)).subscribe();
  }

  abstract supports(): SupportedComponentsModel;

  abstract getGameName(): string;

  abstract processMessage(data: any): void;

}
