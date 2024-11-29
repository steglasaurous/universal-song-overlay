import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";
import {supportedComponentsInitialState} from "../../state/supported-components.reducer";
import {selectConnectedGame} from "../../state/connected-game.selectors";
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html',
    standalone: false
})
export class SongDetailsComponent implements OnInit {

  @Input()
  gameState: GameStateModel = initialState;

  @Input()
  isVisible: boolean = false;

  @Input()
  isAlbumArtVisible: boolean = true;

  connectedGame$ = this.store.select(selectConnectedGame);

  constructor(private store: Store) {

  }

  ngOnInit(): void {
  }

  get songPercentComplete() {
    if (this.gameState.songLength > 0) {
      return Math.floor(this.gameState.songPosition / this.gameState.songLength * 100);
    }

    return 0;
  }

  protected readonly supportedComponents = supportedComponentsInitialState;
}
