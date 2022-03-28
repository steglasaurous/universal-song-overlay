export interface GameStateModel {
  title: string,
  artist: string,
  difficulty: string,
  mapper: string,
  albumArt?: string,
  score: number,
  highScore: number,
  multiplier: number,
  combo: number,
  songLength: number,
  songPosition: number,
  extraText: string,
  playerHealth: number
}
