import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

//angular fire related libraries
import { AngularFirestore } from "@angular/fire/firestore";
import { map, mergeMap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";

import { AuthService } from "../login/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userObject: any;
  uid: string;
  public changeName: FormGroup;
  public changePhoto: FormGroup;
  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.changeName = new FormGroup({
      newName: new FormControl("")
    });

    this.changePhoto = new FormGroup({
      newImage: new FormControl("")
    });
 
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user['uid'].replace('"', "").replace('"', "") 
    this.updateUserData();
  }

  setInputBox() {
    this.changeName.setValue({ newName: this.userObject.displayName });
  }

  //update username of the user
  setUserName() {
    this.afs
      .collection("users")
      .doc(this.uid)
      .update({ displayName: this.changeName.get("newName").value });
    this.updateUserData();
  }

  getUserData(uid) {
    return this.afs
      .collection("users")
      .doc(uid)
      .get();
  }

  updateUserData() {
    this.getUserData(this.uid).subscribe(async doc => {
      this.userObject = await doc.data();
    });
  }

  //file upload related-----------------------------------------------------------------------------------

  private fileRef; //local file reference of the url
  private file: File; // the actual file

  uploadFile(file: File) {
    const fileName = file.name;
    const filePath = `profilePics/${fileName}`;
    console.log("File path : ", filePath);
    const cacheControl = "max-age=3600;";
    this.fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file, { cacheControl });
    return forkJoin(task.snapshotChanges()).pipe(
      mergeMap(() => this.fileRef.getDownloadURL()),
      map(url => url as string)
    );
  }

  //---------------------------------------------------------------------------------------

  onFileChange(event) {
    this.file = event.target.files.item(0);
    console.log(this.file);
  }

  //---------------------------------------------------------------------------------------

  async delete(downloadUrl) {
    return await this.storage.storage.refFromURL(downloadUrl).delete();
  }

  //---------------------------------------------------------------------------------------
  setPhoto() {
    let file = this.file;
    this.uploadFile(file).subscribe(
      e => {
        console.log("Upload initiated...");
      },
      error => {
        console.log(" Error ", error);
      },
      () => {
        const promise = this.fileRef.getDownloadURL().toPromise();
        promise.then(result => { 

          //remove the photo which is already in the database 
          if (this.userObject.customPhoto) {
            delete this.userObject.photoURL;
          }
          
          console.log("Finished uploading file");
          
          //update the firestore document 
          this.afs
            .collection("users")
            .doc(this.uid)
            .update({ photoURL: result, customPhoto : true });
          
          //update  the view 
          this.updateUserData();
        });
      }
    );
    this.updateUserData();
  }

  signOut() {
    console.log("signOut");
  }
}
