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

  serverUrl = 'http://18.222.203.72:3000/playlist';
  javaServerUrlForGet = 'http://18.222.203.72:7788/api/allSongs';
 // javaServerUrlForGet = 'http://localhost:7799/api/allSongs';
  javaServerUrlForUpdate = 'http://18.222.203.72:7788/api/update';
  //javaServerUrlForUpdate = 'http://localhost:7799/api/update';

  javaServerUrlForDelete = 'http://18.222.203.72:7788/api/songs';
  javaServerUrlForAdd = 'http://18.222.203.72:7788/api/new';
  //javaServerUrlForAdd = 'http://localhost:7799/api/new';
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
    this.store.select('playlist').subscribe(next => {
      this.songs = next as Song[];
    });
    console.log("song [] name ="+ this.songs[0].name);
    console.log('add url = ' + this.getAddUrl(song));
    console.log('new song id = ' + song.id + "    song name = " + song.name);

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
