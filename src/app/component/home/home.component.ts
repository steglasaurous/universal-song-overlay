import {Component, Inject, OnInit} from '@angular/core';
import {selectGameStateFeature} from "../../state/gamestate.selectors";
import {selectSupportedComponentsFeature} from "../../state/supported-components.selectors";
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";
import {SupportedComponentsModel} from "../../model/supported-components.model";
import {supportedComponentsInitialState} from "../../state/supported-components.reducer";
import {Store} from "@ngrx/store";
import {GameDataServiceManager} from "../../service/game-data-service-manager";
import {ActivatedRoute} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {selectVisible} from "../../state/visible.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'self-contained-song-overlay';

  gameState$ = this.store.select(selectGameStateFeature);
  supportedComponents$ = this.store.select(selectSupportedComponentsFeature);
  isVisible$ = this.store.select(selectVisible);

  // Used to get around the async directive signature possibly returning null.
  // Not sure if it negates the observable or not?
  // https://stackoverflow.com/questions/61780339/angular-ivy-stricttemplates-true-type-boolean-null-is-not-assignable-to-type
  gameState: GameStateModel = initialState;
  supportedComponents: SupportedComponentsModel = supportedComponentsInitialState;
  enabledComponents: string[] = ['song-details','song-status','score','player-health'];

  constructor(
    private store: Store,
    private gameDataServiceManager: GameDataServiceManager,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    const overrideWebsocketHost: string = this.route.snapshot.queryParamMap.get('websocket_host') ?? "";

    const overrideEnabledComponents: string = this.route.snapshot.queryParamMap.get('show') ?? "";

    if (overrideEnabledComponents) {
      this.enabledComponents = overrideEnabledComponents.split(',')
    }

    this.enabledComponents.find(element => element == 'test');

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

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    const style = this.document.createElement('link');
    style.id = 'theme-' + styleName;
    style.rel = 'stylesheet';
    style.href = `${styleName}`;

    head.appendChild(style);
  }

  ngOnInit(): void {
    const theme = this.route.snapshot.queryParamMap.get('theme') ?? 'default';
    const themeList = theme.split(',');

    themeList.forEach((themeName) => {
      this.loadStyle(themeName + '.css');
    });
  }
}
