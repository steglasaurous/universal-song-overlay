import {SynthRidersMultiGameSpecificDataModel} from "./synth-riders-multi-game-specific-data.model";

export interface MultiplayerStateModel {
  scores: {
    name: string,
    score: number,
    // FIXME: Make this generic so it works with other multiplayer-capable games.
    gameSpecificData?: SynthRidersMultiGameSpecificDataModel
  }[];

  inProgress: boolean;
  completed: boolean;
}
