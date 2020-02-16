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
  tp: string;
  imageList: any[];
  rowIndexArray: any[];

formTemplate = new FormGroup({
  imageUrl : new FormControl('', Validators.required),
  category : new FormControl('', Validators.required),
  type : new FormControl('', Validators.required),
});

  constructor(private af: AngularFireStorage, private upSvc: UploadService, private cf: AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }
  //////////  for image/////////////////////////////////////////////////////
  detectFiles(event: any) {
    this.selectedFiles = event.target.files;
    console.log(event);
  }

////////// form images //////////////////////////////////////////////////////////
  uploadImages(formValue) {
    this.isSubmitted = true;
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.categ = formValue.category;
      this.tp = formValue.type;
      this.upSvc.pushUpload(this.currentUpload, this.categ, this.tp);
      });
    this.resetForm();
  }



  onSubmit(formValue) {
    this.isSubmitted = true;
  }
   get formControls() {
    return this.formTemplate.controls;
  }


  ////// for images and files reset /////////////////////////////////////////////////
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      category: '',
      type: ''
    });
    this.selectedImage = null;
    this.isSubmitted = false;
    this.currentUpload = null;
  }
}
