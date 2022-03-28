import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongStatusComponent } from './song-status.component';

describe('SongStatusComponent', () => {
  let component: SongStatusComponent;
  let fixture: ComponentFixture<SongStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
