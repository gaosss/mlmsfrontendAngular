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
    this.editFormIndicator = ! this.editFormIndicator;
    this.servive.addSong(song);
  }
}
