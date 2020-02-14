import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.scss']
})
export class FileviewComponent implements OnInit {
  uploads: AngularFireList<Upload[]>;
  imgSrc: string ;
  selectedImage: any = null;
  title = 'store';
  selectedFiles: FileList;
  isSubmitted: boolean;
currentUpload: Upload;
imageList: any[];
fileList: any[];
rowIndexArray: any[];
  constructor(private af: AngularFireStorage, private upSvc: UploadService, private cf: AngularFirestore) { }

  ngOnInit() {
    this.upSvc.getFiles().subscribe(
      list => {
        this.fileList = list.map(item => {
          return {
            $key: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Upload;
        } );
        this.rowIndexArray = Array.from(Array(Math.ceil(this.fileList.length / 3)).keys());
        console.log(this.fileList);
      }
    );
  }

  deletefile(item) { this.upSvc.deletefiles(item); }

}
