import {GameStateModel} from "../model/game-state.model";
import {createReducer, on} from "@ngrx/store";
import {
  clearAll, incrementSongPosition,
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
  lastSongInfoUpdate: 0,
  score: 0,
  highScore: 0,
  multiplier: 0,
  combo: 0,
  songLength: 0,
  songPosition: 0,
  extraText: "",
  playerHealth: 0,
  gameSpecificData: null
}

export const gameStateReducer = createReducer(
  initialState,
  on(updateSongDetails, (state: GameStateModel, { title, artist, mapper, difficulty, songLength, extraText, albumArt, lastSongInfoUpdate, gameSpecificData }): GameStateModel => {
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
      albumArt: albumArt,
      lastSongInfoUpdate: lastSongInfoUpdate ?? Date.now(),
      gameSpecificData: gameSpecificData
    };
  }),
  on(updateSongPosition, (state: GameStateModel, { songPosition }): GameStateModel => {
    return {
      ...state,
      songPosition: songPosition
    }
  }),
  on(clearAll, (state: GameStateModel): GameStateModel => {
    // Only clear if the song info was updated more than 4 seconds ago.  Otherwise in certain games like beat saber, this
    // could actually be a restart so don't clear everything.
    if (Date.now() - state.lastSongInfoUpdate > 4000) {
      return initialState;
    }

    return state;
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
  }),
  on(incrementSongPosition, (state: GameStateModel, { }): GameStateModel => {
    return {
      ...state,
      songPosition: state.songPosition + 1
    }
  })
);
