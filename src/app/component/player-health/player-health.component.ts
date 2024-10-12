import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";

@Component({
  selector: 'app-player-health',
  templateUrl: './player-health.component.html'
})
export class PlayerHealthComponent implements OnInit {
  @Input()
  gameState: GameStateModel = initialState;

  @Input()
  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
