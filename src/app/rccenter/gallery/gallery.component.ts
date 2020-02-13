import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  uploads: AngularFireList<Upload[]>;
  imgSrc: string ;
  selectedImage: any = null;
  title = 'store';
  selectedFiles: FileList;
  isSubmitted: boolean;
currentUpload: Upload;
imageList: any[];
rowIndexArray: any[];
  data: any;
  img: any[];

  constructor(private af: AngularFireStorage, private upSvc: UploadService, private cf: AngularFirestore) { }

  ngOnInit() {

   this.upSvc.getUploads().subscribe(
    list => {
      this.imageList = list.map(item => {
        return {
          $key: item.payload.doc.id,
          ...item.payload.doc.data()   /*data()*/
        } as Upload;
      } );
      this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
      console.log(this.imageList);
    }
  );
  }
   deleteimage(item) { this.upSvc.deleteimages(item); }
/* deleteimage(data) {
  this.upSvc.deleteimages(data);
} */


}
