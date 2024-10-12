import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";

@Component({
  selector: 'app-song-status',
  templateUrl: './song-status.component.html'
})
export class SongStatusComponent implements OnInit {

  @Input()
  gameState: GameStateModel = initialState;

  @Input()
  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get songPercentComplete() {
    if (this.gameState.songLength > 0) {
      return Math.floor(this.gameState.songPosition / this.gameState.songLength * 100);
    }

    return 0;
  }

}
