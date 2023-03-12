import {SynthRidersGameDataService} from "./synth-riders-game-data.service";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {AudicaGameDataService} from "./audica-game-data.service";
import {AbstractGameDataService} from "./abstract-game-data.service";
import {BoomboxGameDataService} from "./boombox-game-data.service";
import {AudioTripGameDataService} from "./audio-trip-game-data.service";
import {BeatSaberMapGameDataService} from "./beat-saber-map-game-data.service";
import {BeatSaberLiveGameDataService} from "./beat-saber-live-game-data.service";
import {MultiplayerDataServerService} from "./multiplayer-data-server.service";

@Injectable()
export class GameDataServiceManager {
  private gameDataServices:  AbstractGameDataService[] = [];

  constructor(
    private store: Store,
    synthRidersGameDataService: SynthRidersGameDataService,
    audicaGameDataService: AudicaGameDataService,
    boomboxGameDataService: BoomboxGameDataService,
    audioTripGameDataService: AudioTripGameDataService,
    beatSaberMapGameDataService: BeatSaberMapGameDataService,
    beatSaberLiveGameDataService: BeatSaberLiveGameDataService,
    multiplayerDataServerService: MultiplayerDataServerService
  ) {
    this.gameDataServices.push(
      synthRidersGameDataService,
      audicaGameDataService,
      boomboxGameDataService,
      beatSaberMapGameDataService,
      beatSaberLiveGameDataService,
      audioTripGameDataService,
      multiplayerDataServerService
    );
  }

  public setWebsocketHost(host: string) {
    this.gameDataServices.forEach((gameDataService: AbstractGameDataService) => {
      gameDataService.setHost(host);
    });
  }

  public connect() {
    this.gameDataServices.forEach((gameDataService: AbstractGameDataService) => {
      gameDataService.connect();
    });
  }
}
