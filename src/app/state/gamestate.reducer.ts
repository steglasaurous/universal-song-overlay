import {GameStateModel} from "../model/game-state.model";
import {createReducer, on} from "@ngrx/store";
import {
  clearAll,
  setHighScore,
  updatePlayerHealth,
  updateScore,
  updateSongDetails,
  updateSongPosition
} from "./gamestate.actions";

export const initialState: GameStateModel = {
  title: "",
  artist: "",
  difficulty: "",
  mapper: "",
  albumArt: "",
  score: 0,
  highScore: 0,
  multiplier: 0,
  combo: 0,
  songLength: 0,
  songPosition: 0,
  extraText: "",
  playerHealth: 0
}

export const gameStateReducer = createReducer(
  initialState,
  on(updateSongDetails, (state: GameStateModel, { title, artist, mapper, difficulty, songLength, extraText, albumArt }): GameStateModel => {
    // the ... is called a "spread operator". It returns a new object based on a copy of the old one plus changes.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

    return {
      ...state,
      title: title,
      artist: artist,
      mapper: mapper,
      difficulty: difficulty,
      songLength: songLength,
      extraText: extraText,
      albumArt: albumArt
    };
  }),
  on(updateSongPosition, (state: GameStateModel, { songPosition }): GameStateModel => {
    console.log(state);

    return {
      ...state,
      songPosition: songPosition
    }
  }),
  on(clearAll, (state: GameStateModel): GameStateModel => {
    return initialState;
  }),
  on(updateScore, (state: GameStateModel, { score, combo, multiplier }): GameStateModel => {
    return {
      ...state,
      score: score ?? state.score,
      combo: combo ?? state.combo,
      multiplier: multiplier ?? state.multiplier
    }
  }),
  on(setHighScore, (state: GameStateModel, { highScore }): GameStateModel => {
    return {
      ...state,
      highScore: highScore
    }
  }),
  on(updatePlayerHealth, (state: GameStateModel, { playerHealth }): GameStateModel => {
    return {
      ...state,
      playerHealth: playerHealth
    }
  })
);
