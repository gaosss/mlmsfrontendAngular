import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SongDisplayComponent} from './song-manage/song-display/song-display.component';

const routes: Routes = [

 //{path: '', loadChildren: './song-manage/song-manage.module#SongManageModule'}
 //  {path: '', component: SongDisplayComponent}

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


