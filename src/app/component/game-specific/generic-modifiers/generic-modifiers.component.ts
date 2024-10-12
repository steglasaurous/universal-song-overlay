import {Component, Input} from '@angular/core';
import {GameStateModel} from "../../../model/game-state.model";
import {initialState} from "../../../state/gamestate.reducer";

@Component({
  selector: 'app-generic-modifiers',
  standalone: true,
  imports: [],
  templateUrl: './generic-modifiers.component.html'
})
export class GenericModifiersComponent {
  @Input()
  gameState: GameStateModel = initialState;
}
