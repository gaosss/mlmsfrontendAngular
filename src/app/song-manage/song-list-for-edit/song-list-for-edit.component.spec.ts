import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListForEditComponent } from './song-list-for-edit.component';

describe('SongListForEditComponent', () => {
  let component: SongListForEditComponent;
  let fixture: ComponentFixture<SongListForEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongListForEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongListForEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
