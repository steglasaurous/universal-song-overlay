import {Component, Input} from '@angular/core';
import {initialState} from "../../state/multiplayerstate.reducer";
import {MultiplayerStateModel} from "../../model/multiplayer-state.model";

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent {
  @Input()
  multiplayerState: MultiplayerStateModel = initialState;

  @Input()
  isVisible: boolean = false;

}
