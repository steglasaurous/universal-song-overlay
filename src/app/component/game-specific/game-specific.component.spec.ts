import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSpecificComponent } from './game-specific.component';

describe('GameSpecificComponent', () => {
  let component: GameSpecificComponent;
  let fixture: ComponentFixture<GameSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
