import { Injectable } from '@angular/core';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Upload } from './upload';
import { FormGroup, FormControl } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private uid: string;
  uploads: AngularFireList<Upload[]>;
  imageDetailList: AngularFireList<any>;
  imageList: any[];
  rowIndexArray: any[];
  storageRef: any;
  state: boolean;
  upl: string;
  typ: string;
  userDoc: any;
  data: any;
  itemCollections: AngularFirestoreCollection<Upload>;
  items: Observable<Upload[]>;
  itemDoc: AngularFirestoreDocument<Upload[]>;

  constructor(private afAuth: AngularFireAuth, private af: AngularFireStorage , private cf: AngularFirestore ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

      private basePath: string = 'digiresource/';
      private uploadTask: firebase.storage.UploadTask;
      private name;
      private url;


    ///////////////// get images //////////
    getUploads() {
      return this.cf.collection(`digiresource`).snapshotChanges();
    }


    /////////////////////////// upload image ///////////////////////////////////////////////
      pushUpload(upload: Upload, upname: string, typp: string) {
        const storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child('digiresource/' + upload.file.name).put(upload.file); // upload.file.name
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
          () => {
            storageRef.child(`digiresource/${upload.file.name}`).getDownloadURL().then((downloadURL) => {

              this.cf.collection(this.basePath).add({
                  name: upload.file.name,
                  url: downloadURL,
                  type: typp,
                  uid:"123",
                  uploader: upname,
                  

              });
            });

          }
        );
      }

      ///////////////// delete image //////////////////////////
      deleteimages(item: Upload) {
        this.itemDoc = this.cf.doc(`digiresource/${item.$key}`);
        this.itemDoc.delete();
        console.log('Delete Successfully');
      }
}

