import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  @Input()
  gameState: GameStateModel = initialState;

  @Input()
  isVisible: boolean = false;

  @Input()
  isAlbumArtVisible: boolean = true;

  constructor() {

  }

  ngOnInit(): void {
  }

  get songPercentComplete() {
    if (this.gameState.songLength > 0) {
      return Math.floor(this.gameState.songPosition / this.gameState.songLength * 100);
    }

    return 0;
  }
}
