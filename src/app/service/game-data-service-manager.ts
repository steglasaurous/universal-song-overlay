import {SynthRidersGameDataService} from "./synth-riders-game-data.service";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {AudicaGameDataService} from "./audica-game-data.service";
import {AbstractGameDataService} from "./abstract-game-data.service";
import {BoomboxGameDataService} from "./boombox-game-data.service";

@Injectable()
export class GameDataServiceManager {
  private gameDataServices:  AbstractGameDataService[] = [];

  constructor(
    private store: Store,
    synthRidersGameDataService: SynthRidersGameDataService,
    audicaGameDataService: AudicaGameDataService,
    boomboxGameDataService: BoomboxGameDataService,
  ) {
    this.gameDataServices.push(
      synthRidersGameDataService,
      audicaGameDataService,
      boomboxGameDataService
    );
  }


}
