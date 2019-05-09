import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {Store} from './store';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './component/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestModule} from './test/test.module';
import {DemoComponent} from './song-manage/demo/demo.component';
import {SongManageModule} from './song-manage/song-manage.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,




  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SongManageModule,
    BrowserAnimationsModule,
    TestModule,



  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
