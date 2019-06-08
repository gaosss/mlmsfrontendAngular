import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServiceService, Song} from '../../data-layer/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy {

  editFormIndicator: boolean;

  constructor(private servive: ServiceService) {

    this.editFormIndicator = false;




  }

  ngOnInit() {

  }





  ngOnDestroy(): void {
  }

  onAddClick() {
    this.editFormIndicator = ! this.editFormIndicator;
  }

  onEvent(song: Song) {
    //if (song.name && song.singer && song.listened && song.favor) {

      this.editFormIndicator = !this.editFormIndicator;
      console.log('addsong is triggered and song name is' + song.name);
      this.servive.addSong(song);
    // }
    // else {alert('please input all the info needed.')}
  }
}
