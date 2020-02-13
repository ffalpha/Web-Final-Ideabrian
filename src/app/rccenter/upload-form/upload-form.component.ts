import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router' ;
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators' ;

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  uploads: AngularFireList<Upload[]>;
  imgSrc: string ;
  selectedImage: any = null;
  title = 'store';
  selectedFiles: FileList;
  isSubmitted: boolean;
currentUpload: Upload;
categ: string;
imageList: any[];
hasini: any[];
rowIndexArray: any[];

formTemplate = new FormGroup({
  imageUrl : new FormControl('', Validators.required),
  category : new FormControl('', Validators.required),
});

  constructor(private af: AngularFireStorage, private upSvc: UploadService, private cf: AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }
  ////// for images and files reset /////////////////////////////////////////////////
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      category: ''
    });
   // this.imgSrc = '/assets/img/img.png';
    this.selectedImage = null;
    this.isSubmitted = false;
    this.currentUpload = null;
  }

}
