import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SongDisplayComponent} from './song-manage/song-display/song-display.component';
import {SongUpdateComponent} from './song-manage/song-update/song-update.component';

const routes: Routes = [

 //{path: '', loadChildren: './song-manage/song-manage.module#SongManageModule'}
 //  {path: '', component: SongDisplayComponent}
  {path: ':id', component: SongUpdateComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }


