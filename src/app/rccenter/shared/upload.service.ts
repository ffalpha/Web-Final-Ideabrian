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
  catego: string;
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

      private basePath: string = 'Images/';
      private baseFilePath: string = 'Files/';
      private baseVideoPath: string = 'Videos/';
      private uploadTask: firebase.storage.UploadTask;
      private name;
      private url;

    getUploads() {
      return this.cf.collection(`/${this.basePath}`).snapshotChanges();
      }
      getFiles() {
        return this.cf.collection(`/${this.baseFilePath}`).snapshotChanges();
      }

      getVideos() {
        return this.cf.collection(`/${this.baseVideoPath}`).snapshotChanges();
      }

      /////////////////////////// upload image ///////////////////////////////////////////////
      pushUpload(upload: Upload, category: string) {
        const storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child('Images/' + upload.file.name).put(upload.file); // upload.file.name
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
           () => {
           storageRef.child(`Images/${upload.file.name}`).getDownloadURL().then((downloadURL) => {

              this.cf.collection(this.basePath).add({
                  name: upload.file.name,
                  url: downloadURL,
                  cat: category,

              });
          });

          }
        );
      }


      /////// upload files ////////////////////////////////////////////////////////
      pushUploadF(upload: Upload, category: string) {
        const storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child('Files/' + upload.file.name).put(upload.file); // upload.file.name

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
          () => {
            storageRef.child(`Files/${upload.file.name}`).getDownloadURL().then((downloadURL) => {

              this.cf.collection(this.baseFilePath).add({
                  name: upload.file.name,
                  url: downloadURL,
                  cat: category
              });
          });

          }
        );
      }
      //////////// upload videos/////////////////////////

      pushUploadV(upload: Upload, category: string) {
        const storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child('Videos/' + upload.file.name).put(upload.file); // upload.file.name

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
          () => {
            storageRef.child(`Videos/${upload.file.name}`).getDownloadURL().then((downloadURL) => {

              this.cf.collection(this.baseVideoPath).add({
                  name: upload.file.name,
                  url: downloadURL,
                  cat: category
              });
          });

          }
        );
      }
      deleteimages(item: Upload) {
        this.itemDoc = this.cf.doc(`Images/${item.$key}`);
        this.itemDoc.delete();
     }

     deletefiles(item: Upload) {
      this.itemDoc = this.cf.doc(`Files/${item.$key}`);
      this.itemDoc.delete();
   }

   deletevideos(item: Upload) {
    this.itemDoc = this.cf.doc(`Videos/${item.$key}`);
    this.itemDoc.delete();
  }
}

