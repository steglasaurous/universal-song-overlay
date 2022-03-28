import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SongDetailsComponent } from './component/song-details/song-details.component';
import {gameStateReducer} from "./state/gamestate.reducer";
import {GameDataServiceManager} from "./service/game-data-service-manager";
import {SynthRidersGameDataService} from "./service/synth-riders-game-data.service";
import { SongStatusComponent } from './component/song-status/song-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScoreComponent } from './component/score/score.component';
import { PlayerHealthComponent } from './component/player-health/player-health.component';
import {supportedComponentsReducer} from "./state/supported-components.reducer";

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
      gameState: gameStateReducer, supportedComponents: supportedComponentsReducer
    }, {}),
    NgbModule
  ],
  providers: [
    GameDataServiceManager,
    SynthRidersGameDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
