import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ServiceService, Song} from '../../data-layer/service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '../../store';
import {Subscription} from 'rxjs';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-song-list-for-edit',
  templateUrl: './song-list-for-edit.component.html',
  styleUrls: ['./song-list-for-edit.component.scss']
})
export class SongListForEditComponent implements OnInit , OnChanges{

  @Input() song: Song;
  @Output() songUpdate: EventEmitter<Song>;
  formGroup: FormGroup;
  formBody: Object;
  mySong: Song;
  constructor(private formBuilder: FormBuilder,
              private service: ServiceService,
              private router: Router,
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
    console.log("add is trippger");
    this.mySong = this.formGroup.value;
    console.log("this.mysong name = " + this.mySong.name);
    //console.log("this.mySong.name =" + this.mySong.name);
    //if (this.song === undefined && this.mySong.name !== '') {
      //this.service.addSong(this.mySong);
    console.log("this.songUpdate is emit");
    this.songUpdate.emit(this.mySong);

   //}
  }

  ngOnChanges(changes: SimpleChanges): void {

    const value = this.song;

    console.log('on change');
    this.formGroup.patchValue(value);

  }

  cancel() {
    this.router.navigate(['/']);
  }
}
