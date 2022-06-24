export interface GameStateModel {
  title: string,
  artist: string,
  difficulty: string,
  mapper: string,
  albumArt?: string,
  // When the song details were last updated.  Used with clearAll() to determine if it should run or not (won't run if the last
  // song details update was too soon)
  lastSongInfoUpdate: number,
  score: number,
  highScore: number,
  multiplier: number,
  combo: number,
  songLength: number,
  songPosition: number,
  extraText: string,
  playerHealth: number
}
