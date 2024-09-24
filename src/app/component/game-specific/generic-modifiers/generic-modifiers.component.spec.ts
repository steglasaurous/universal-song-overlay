import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericModifiersComponent } from './generic-modifiers.component';

describe('GenericModifiersComponent', () => {
  let component: GenericModifiersComponent;
  let fixture: ComponentFixture<GenericModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericModifiersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
