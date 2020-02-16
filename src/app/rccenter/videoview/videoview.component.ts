import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-videoview',
  templateUrl: './videoview.component.html',
  styleUrls: ['./videoview.component.scss']
})
export class VideoviewComponent implements OnInit {
  uploads: AngularFireList<Upload[]>;
  imgSrc: string ;
  selectedImage: any = null;
  title = 'store';
  selectedFiles: FileList;
  isSubmitted: boolean;
currentUpload: Upload;
imageList: any[];
videoList: any[];
rowIndexArray: any[];

  constructor(private af: AngularFireStorage, private upSvc: UploadService, private cf: AngularFirestore) { }

  ngOnInit() {
    /*this.upSvc.getVideos().subscribe(
      list => {
        this.videoList = list.map(item => {
          return {
            $key: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Upload;
        } );
        this.rowIndexArray = Array.from(Array(Math.ceil(this.videoList.length / 3)).keys());
        console.log(this.videoList);
      }
    );*/
  }
 // deletevideo(item) { this.upSvc.deletevideos(item); }

}
