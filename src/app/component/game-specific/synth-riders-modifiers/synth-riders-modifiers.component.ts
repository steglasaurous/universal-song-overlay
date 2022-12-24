import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../../model/game-state.model";
import {initialState} from "../../../state/gamestate.reducer";

@Component({
  selector: 'app-synth-riders-modifiers',
  templateUrl: './synth-riders-modifiers.component.html',
  styleUrls: ['./synth-riders-modifiers.component.scss']
})
export class SynthRidersModifiersComponent implements OnInit {
  @Input()
  gameState: GameStateModel = initialState;

  iconMap: Map<string, string> = new Map<string, string>();
  constructor() {
    this.iconMap.set('noFailEnabled', 'ico-no-fail.png');

  }

  ngOnInit(): void {
    console.log(this.gameState.gameSpecificData);
  }

}
