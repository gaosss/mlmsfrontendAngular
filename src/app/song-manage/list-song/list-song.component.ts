import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ServiceService, Song} from '../../data-layer/service.service';
import {Subscription} from 'rxjs';
import {Store} from '../../store';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit, OnDestroy {

  @Input() disType: string;
  songs: Song[];
  subscription: Subscription;
  del: boolean[];

  constructor(private service: ServiceService,
              private store: Store) {
this.del = [];
  }

  ngOnInit() {

    this.subscription = this.service.getPlayList$.subscribe();

    this.store.select('playlist').subscribe(nnn => {
      // @ts-ignore
      this.songs = nnn;
    });

  }

  ngOnDestroy(): void {
  }

  getRoute(item: Song) {
    return [`/` + item.id];
  }

  async clickFavor(i: number) {
    this.songs[i].favor = !this.songs[i].favor;

    console.log('songid= ' + this.songs[i].id);
    await this.service.updateSong(this.songs[i]);

  }

  async clickListen(i: number) {
    this.songs[i].listened = !this.songs[i].listened;

    await this.service.updateSong(this.songs[i]);
  }

  removeItem(i: number) {
    this.del[i] = false;
    this.service.deleteSong(this.songs[i]);

    this.songs = this.songs.filter(data => data !== this.songs[i]);

    this.store.set('playlist', this.songs);

  }

  onClickNo(i: number) {
    this.del[i] = false;

  }

  onTrachClick(i: number) {
    this.del[i] = true;
  }


  getSongById(id: number): Song {
    let song: Song = null;
    for (const item of this.songs) {
      if (item.id === id) {
        song = item;
      }
    }
    return song;
  }
}
