import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";
import {SynthRidersGameDataService} from "../../service/synth-riders-game-data.service";

@Component({
  selector: 'app-game-specific',
  templateUrl: './game-specific.component.html'
})
export class GameSpecificComponent implements OnInit {
  @Input()
  gameState: GameStateModel = initialState;

  @Input()
  isVisible: boolean = false;

  @Input()
  connectedGame?: string;

  readonly games = {
    'synthRiders': SynthRidersGameDataService.GAME_NAME
  };

  constructor() { }

  ngOnInit(): void {
  }

}
