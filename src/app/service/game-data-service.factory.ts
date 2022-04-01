import {Store} from "@ngrx/store";
import {SynthRidersGameDataService} from "./synth-riders-game-data.service";
import {AudicaGameDataService} from "./audica-game-data.service";
import {BoomboxGameDataService} from "./boombox-game-data.service";
import {AudioTripGameDataService} from "./audio-trip-game-data.service";
import {BeatSaberMapGameDataService} from "./beat-saber-map-game-data.service";
import {BeatSaberLiveGameDataService} from "./beat-saber-live-game-data.service";
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
    case BoomboxGameDataService.name:
      return (store: Store) => {
        return new BoomboxGameDataService(store, host);
      }
    case AudioTripGameDataService.name:
      return (store: Store) => {
        return new AudioTripGameDataService(store, host);
      }
    case BeatSaberMapGameDataService.name:
      return (store: Store) => {
        return new BeatSaberMapGameDataService(store, host);
      }
    case BeatSaberLiveGameDataService.name:
      return (store: Store) => {
        return new BeatSaberLiveGameDataService(store, host);
      }
  }

  throw new Error("Invalid game data service specified.");
}
