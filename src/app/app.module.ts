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
import {BoomboxGameDataService} from "./service/boombox-game-data.service";
import {AudioTripGameDataService} from "./service/audio-trip-game-data.service";
import {BeatSaberMapGameDataService} from "./service/beat-saber-map-game-data.service";
import {BeatSaberLiveGameDataService} from "./service/beat-saber-live-game-data.service";
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './component/home/home.component';
import {visibleReducer} from "./state/visible.reducer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from "@angular/material/legacy-progress-spinner";
import { SynthRidersModifiersComponent } from './component/game-specific/synth-riders-modifiers/synth-riders-modifiers.component';
import { GameSpecificComponent } from './component/game-specific/game-specific.component';
import { MultiplayerComponent } from './component/multiplayer/multiplayer.component';
import {multiplayerStateReducer} from "./state/multiplayerstate.reducer";

const routes: Routes =[
  { path: "", component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SongDetailsComponent,
    SongStatusComponent,
    ScoreComponent,
    PlayerHealthComponent,
    HomeComponent,
    SynthRidersModifiersComponent,
    GameSpecificComponent,
    MultiplayerComponent
  ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({
            gameState: gameStateReducer,
            supportedComponents: supportedComponentsReducer,
            connectedGame: connectedGameReducer,
            isVisible: visibleReducer,
            multiplayerState: multiplayerStateReducer,
        }, {}),
        NgbModule,
        // NOTE: Using the hash strategy for routing so that this app will work when loaded directly as a file (for 2-pc stream setups)
        RouterModule.forRoot(routes, {useHash: true}),
        BrowserAnimationsModule,
        MatProgressSpinnerModule
    ],
  providers: [
    {
      provide: SynthRidersGameDataService, useFactory: GameDataServiceFactory(SynthRidersGameDataService.name), deps: [ Store ]
    },
    {
      provide: AudicaGameDataService, useFactory: GameDataServiceFactory(AudicaGameDataService.name), deps: [ Store ]
    },
    {
      provide: BoomboxGameDataService, useFactory: GameDataServiceFactory(BoomboxGameDataService.name), deps: [ Store ]
    },
    {
      provide: AudioTripGameDataService, useFactory: GameDataServiceFactory(AudioTripGameDataService.name), deps: [ Store ]
    },
    {
      provide: BeatSaberMapGameDataService, useFactory: GameDataServiceFactory(BeatSaberMapGameDataService.name), deps: [ Store ]
    },
    {
      provide: BeatSaberLiveGameDataService, useFactory: GameDataServiceFactory(BeatSaberLiveGameDataService.name), deps: [ Store ]
    },
    GameDataServiceManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
