import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store} from '../store';
import {tap} from 'rxjs/operators';

export interface State {
  playlist: Song[];

}

export interface Song {
  id: number;
  listened: boolean;
  favor: boolean;
  singer: string;
  name: string;

}


@Injectable({
    providedIn: 'root'
  })
  export class ServiceService {

  javaServerUrlForGet = '//ec2-3-17-37-15.us-east-2.compute.amazonaws.com:7788/api/allSongs';
  javaServerUrlForUpdate = '//ec2-3-17-37-15.us-east-2.compute.amazonaws.com:7788/api/update';
  javaServerUrlForDelete = '//ec2-3-17-37-15.us-east-2.compute.amazonaws.com:7788/api/songs';
 javaServerUrlForAdd = '//ec2-3-17-37-15.us-east-2.compute.amazonaws.com:7788/api/new';

   // javaServerUrlForGet = '//localhost:4200/api/allSongs';
   // javaServerUrlForUpdate = '//localhost:4200/api/update';
   // javaServerUrlForDelete = '//localhost:4200/api/songs';
   // javaServerUrlForAdd = '//localhost:4200/api/new';


  // javaServerUrlForGet = '//mlmsfrontend.s3-website.us-east-2.amazonaws.com:4200/api/allSongs';
  // javaServerUrlForUpdate = '//mlmsfrontend.s3-website.us-east-2.amazonaws.com:4200/api/update';
  // javaServerUrlForDelete = '//mlmsfrontend.s3-website.us-east-2.amazonaws.com:4200/api/songs';
  // javaServerUrlForAdd = '//mlmsfrontend.s3-website.us-east-2.amazonaws.com:4200/api/new';

  getPlayList$: Observable<any>;
  songs: Song[];

  constructor(public http: HttpClient,
              private store: Store) {

    this.getAllSongs();

  }



  getUpdateUrl(song: Song): string {
    console.log("song id is " + song.id)
   return this.javaServerUrlForUpdate + '/' + song.id + '?name=' + song.name + '&singer='
      + song.singer + '&favor=' + song.favor + '&listened=' + song.listened;
  }

  getAddUrl(song: Song): string {

    return this.javaServerUrlForAdd + '/' + '?name=' + song.name + '&singer='
      + song.singer + '&favor=' + song.favor + '&listened=' + song.listened;
  }

  getAllSongs() {
    this.getPlayList$ = this.http.get(this.javaServerUrlForGet).pipe(tap (next => {
      this.store.set('playlist', next);
      console.log('2   next=' + next);
    }));


  }
  updateSong(song: Song) {
    this.http.put(this.getUpdateUrl(song), null).subscribe();

  }
  deleteSong(song: Song) {
    const tmp = this.javaServerUrlForDelete + '/' + song.id;
    this.http.delete(tmp).subscribe();
  }

  addSong(song: Song) {
    //console.log('addsong2 is triggered and song name is ' + song.name)
    this.store.select('playlist').subscribe(next => {
      this.songs = next as Song[];
      //console.log('the songs = ' + this.songs);
    });
    //console.log("song [] name ="+ this.songs[0].name);
    //console.log('add url = ' + this.getAddUrl(song));
    //console.log('new song id = ' + song.id + "    song name = " + song.name);

    this.http.post(this.getAddUrl(song), null).subscribe(value => {
      console.log('post sucessful vaule =  ' + value);
      song.id = value as number;
      console.log('length before  =  ' + this.songs.length);
      this.songs.push(song);
      console.log('length after  =  ' + this.songs.length);
    }, error1 => {
      console.log('post fail' + error1);
    });

  }

}
