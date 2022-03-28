import {GameDataServiceInterface} from "./game-data-service.interface";
import {SynthRidersGameDataService} from "./synth-riders-game-data.service";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";

@Injectable()
export class GameDataServiceManager {
  private gameDataServices:  GameDataServiceInterface[] = [];

  constructor(
    private store: Store,
    synthRidersGameDataService: SynthRidersGameDataService
  ) {
    this.gameDataServices.push(
      synthRidersGameDataService
    );
  }


}
