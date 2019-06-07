import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongUpdateComponent } from './song-update.component';

describe('SongUpdateComponent', () => {
  let component: SongUpdateComponent;
  let fixture: ComponentFixture<SongUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
