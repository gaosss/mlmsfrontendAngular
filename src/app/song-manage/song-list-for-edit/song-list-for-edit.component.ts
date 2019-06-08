import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ServiceService, Song} from '../../data-layer/service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-song-list-for-edit',
  templateUrl: './song-list-for-edit.component.html',
  styleUrls: ['./song-list-for-edit.component.scss']
})
export class SongListForEditComponent implements OnInit , OnChanges{

  @Input() song: Song;
  @Output() songUpdate: EventEmitter<Song>;
  @Output() indicator: EventEmitter<boolean>;
  formGroup: FormGroup;
  formBody: Object;
  mySong: Song;
  constructor(private formBuilder: FormBuilder
              ) {
    this.songUpdate = new EventEmitter();
    this.indicator = new EventEmitter();
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


      if (this.mySong.name !== '') {
      console.log("########this.mysong name = " + this.mySong.name);

      console.log("this.songUpdate is emit");
      this.songUpdate.emit(this.mySong);

    } else {
        this.indicator.emit(false);
      }
  }

  ngOnChanges(changes: SimpleChanges): void {

    const value = this.song;

    console.log('on change');
    this.formGroup.patchValue(value);

  }


}
