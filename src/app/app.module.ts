import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {Store, StoreModule} from '@ngrx/store';
import { SongDetailsComponent } from './component/song-details/song-details.component';
import {gameStateReducer} from "./state/gamestate.reducer";
import {GameDataServiceManager} from "./service/game-data-service-manager";
import {SynthRidersGameDataService} from "./service/synth-riders-game-data.service";
import { SongStatusComponent } from './component/song-status/song-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScoreComponent } from './component/score/score.component';
import { PlayerHealthComponent } from './component/player-health/player-health.component';
import {supportedComponentsReducer} from "./state/supported-components.reducer";
import {AudicaGameDataService} from "./service/audica-game-data.service";
import {GameDataServiceFactory} from "./service/game-data-service.factory";
import {connectedGameReducer} from "./state/connected-game.reducer";

/**
 * This is what reads the query params for an alternate websocket_host.  This seems a little 'hacky' to me, but
 * for now it works.
 */
let params = new URLSearchParams(window.location.search);
const websocketHost = params.get('websocket_host') ?? "localhost";


@NgModule({
  declarations: [
    AppComponent,
    SongDetailsComponent,
    SongStatusComponent,
    ScoreComponent,
    PlayerHealthComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      gameState: gameStateReducer,
      supportedComponents: supportedComponentsReducer,
      connectedGame: connectedGameReducer
    }, {}),
    NgbModule
  ],
  providers: [
    {
      provide: SynthRidersGameDataService, useFactory: GameDataServiceFactory(SynthRidersGameDataService.name, websocketHost), deps: [ Store ]
    },
    {
      provide: AudicaGameDataService, useFactory: GameDataServiceFactory(AudicaGameDataService.name, websocketHost), deps: [ Store ]
    },
    GameDataServiceManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
