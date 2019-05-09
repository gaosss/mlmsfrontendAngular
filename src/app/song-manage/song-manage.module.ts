import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSongComponent } from './list-song/list-song.component';
import { RouterModule, Routes} from '@angular/router';
import { SongDisplayComponent } from './song-display/song-display.component';
import { SongListForEditComponent } from './song-list-for-edit/song-list-for-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DemoComponent } from './demo/demo.component';
const ROUTES: Routes = [
 {path: '', component: SongDisplayComponent},
  ];

@NgModule({
  declarations: [ ListSongComponent,   SongDisplayComponent, SongListForEditComponent, DemoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCheckboxModule,

  ],
  exports: [SongListForEditComponent]
})
export class SongManageModule { }
