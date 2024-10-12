import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthRidersModifiersComponent } from './synth-riders-modifiers.component';

describe('SynthRidersModifiersComponent', () => {
  let component: SynthRidersModifiersComponent;
  let fixture: ComponentFixture<SynthRidersModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynthRidersModifiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthRidersModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
