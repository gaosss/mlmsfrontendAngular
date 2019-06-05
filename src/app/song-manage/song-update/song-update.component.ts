import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServiceService, Song} from '../../data-layer/service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '../../store';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-song-update',
  templateUrl: './song-update.component.html',
  styleUrls: ['./song-update.component.scss']
})
export class SongUpdateComponent implements OnInit, OnDestroy {

  song$: Observable<Song>;
  subscription: Subscription;
  songId: number;
  singleSong: Song;
  singleSongs: Song[];
  allSongs: Song[];

  constructor(private songsService: ServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store
  ) { }

  ngOnInit() {
    this.subscription = this.songsService.getPlayList$.subscribe(
    next => {
      this.allSongs = next;
      this.activatedRoute.params.subscribe(
        param => {
         // console.log("songid = " + param.id);
          this.songId = param.id;
          this.singleSongs = this.allSongs.filter( (nn) => {
            console.log('nn id = ' + nn.id);
            console.log('songid = ' + this.songId);

            if (nn.id == this.songId) {
              console.log('2222   nn id = ' + nn.id);
              return nn;
            }
          });
          console.log("this.singleSongs =  "+ this.singleSongs.length);
          this.singleSong = this.singleSongs[0];
          this.song$ = of(this.singleSong);
          console.log("this.song$= "+ this.song$);
        });
    }
  );
    console.log('song update on init' );
  }

  updateSong(song: Song) {
    console.log('update song is trigger');
    song.id = this.songId;
    console.log('updateSong(song: Song) and id is = ' + song.id);

    this.songsService.updateSong(song);

    for (let i = 0; i < this.allSongs.length; i++) {
      console.log("this.allSongs[i].id = "+ this.allSongs[i].id);
      if (this.allSongs[i].id == song.id) {
        console.log("*********this.allSongs[i].id = "+ this.allSongs[i].id);
        this.allSongs[i] = song;
        this.store.set('playlist', this.allSongs);
      }
    }


    this.router.navigate(['/']);
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
