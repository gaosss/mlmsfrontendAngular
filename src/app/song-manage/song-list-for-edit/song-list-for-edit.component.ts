import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceService, Song} from '../../data-layer/service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '../../store';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-song-list-for-edit',
  templateUrl: './song-list-for-edit.component.html',
  styleUrls: ['./song-list-for-edit.component.scss']
})
export class SongListForEditComponent implements OnInit {

  @Input() song: Song;
  @Output() songUpdate: EventEmitter<Song>;
  formGroup: FormGroup;
  formBody: Object;
  mySong: Song;
  constructor(private formBuilder: FormBuilder,
              private service: ServiceService,
              ) {
    this.songUpdate = new EventEmitter();
    this.formBody = {
      name: '',
      listened: false,
      favor: false,
      singer: '',

    };

    this.formGroup = this.formBuilder.group(this.formBody);

  }

  ngOnInit() {



  }

  update() {
    this.mySong = this.formGroup.value;
    if (this.song === undefined && this.mySong.name !== '') {
      this.service.addSong(this.mySong);
      this.songUpdate.emit(this.mySong);

    }
  }
}
