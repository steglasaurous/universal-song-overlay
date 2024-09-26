import {Component, Input, OnInit} from '@angular/core';
import {GameStateModel} from "../../../model/game-state.model";
import {initialState} from "../../../state/gamestate.reducer";

@Component({
  selector: 'app-synth-riders-modifiers',
  templateUrl: './synth-riders-modifiers.component.html',
  styleUrls: ['./synth-riders-modifiers.component.scss']
})
export class SynthRidersModifiersComponent {
  @Input()
  gameState: GameStateModel = initialState;

  getSpinDegrees(spinDegreesValue: number): string {
    switch (spinDegreesValue) {
      case 0:
        return '90';
      case 1:
        return '180';
      case 2:
        return '360';
      case 3:
        return '360+';
    }

    return '';
  }

  getSpinIntensity(spinIntensityValue: number): string {
    switch (spinIntensityValue) {
      case 0:
        return 'styled';
      case 1:
        return 'wild';
      case 2:
        return 'mild';
    }

    return '';
  }

  getSpiralIntensity(spiralIntensityValue: number): string {
    switch (spiralIntensityValue) {
      case 1:
        return 'mild';
      case 2:
        return 'styled';
      case 3:
        return 'wild';
    }

    return '';
  }




}
