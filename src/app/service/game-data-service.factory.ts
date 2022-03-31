import {Store} from "@ngrx/store";
import {SynthRidersGameDataService} from "./synth-riders-game-data.service";
import {AudicaGameDataService} from "./audica-game-data.service";
export const GameDataServiceFactory = (gameName: string, host: string = 'localhost') => {
  switch (gameName) {
    case SynthRidersGameDataService.name:
      return (store: Store) => {
        return new SynthRidersGameDataService(store, host);
      }
    case AudicaGameDataService.name:
      return (store: Store) => {
        return new AudicaGameDataService(store, host);
      }
  }
  throw new Error("Invalid game data service specified.");
}
