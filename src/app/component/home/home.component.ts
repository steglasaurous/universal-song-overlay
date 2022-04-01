import { Component, OnInit } from '@angular/core';
import {selectGameStateFeature} from "../../state/gamestate.selectors";
import {selectSupportedComponentsFeature} from "../../state/supported-components.selectors";
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";
import {SupportedComponentsModel} from "../../model/supported-components.model";
import {supportedComponentsInitialState} from "../../state/supported-components.reducer";
import {Store} from "@ngrx/store";
import {GameDataServiceManager} from "../../service/game-data-service-manager";
import {
  clearAll,
  setHighScore,
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "../../state/gamestate.actions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'self-contained-song-overlay';

  gameState$ = this.store.select(selectGameStateFeature);
  supportedComponents$ = this.store.select(selectSupportedComponentsFeature);

  // Used to get around the async directive signature possibly returning null.
  // Not sure if it negates the observable or not?
  // https://stackoverflow.com/questions/61780339/angular-ivy-stricttemplates-true-type-boolean-null-is-not-assignable-to-type
  gameState: GameStateModel = initialState;
  supportedComponents: SupportedComponentsModel = supportedComponentsInitialState;

  constructor(
    private store: Store,
    private gameDataServiceManager: GameDataServiceManager,
    private route: ActivatedRoute
  ) {
    const overrideWebsocketHost: string = this.route.snapshot.queryParamMap.get('websocket_host') ?? "";

    if (overrideWebsocketHost) {
      this.gameDataServiceManager.setWebsocketHost(overrideWebsocketHost);
    }

    this.gameState$.subscribe((gameState: GameStateModel) => {
      this.gameState = gameState;
    });

    this.supportedComponents$.subscribe((supportedComponents: SupportedComponentsModel) => {
      this.supportedComponents = supportedComponents;
      console.log(supportedComponents);
    });

    this.gameDataServiceManager.connect();
  }

  testUpdate() {
    this.store.dispatch(updateSongDetails({
      title: "Test Title",
      artist: "Test artist",
      songLength: 123,
      mapper: "Abc",
      difficulty: "Master",
      extraText: "AAAA",
      albumArt: "https://synthriderz.com/api/beatmaps/4635/cover?v=1&size=250"
    }));

    this.store.dispatch(updateSongPosition(
      {
        songPosition: 60
      }
    ));

    this.store.dispatch(setHighScore({ highScore: 1024372}));
    this.store.dispatch(updateScore({ score: 123456, combo: 22, multiplier: 2}));
    this.store.dispatch(updatePlayerHealth({ playerHealth: 89 }));
  }

  testClear() {
    this.store.dispatch(clearAll());
  }

  ngOnInit(): void {
  }

}
