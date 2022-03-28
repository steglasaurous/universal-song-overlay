import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../model/game-state.model";
import {initialState} from "../../state/gamestate.reducer";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input()
  gameState: GameStateModel = initialState;

  @Input()
  showHighScore: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
