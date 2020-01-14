import { Injectable } from '@angular/core'; 
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class EditUserDataService {

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    ) { }


setData(uid,data){
  console.log("UID : " , uid)
  console.log("Data  : " , data)
  this.afs.collection("users").doc(uid).set(data);
}

setProfilePic(uid,url){
  this.afs.collection("users").doc(uid).set({
    photoURL : url, 
    })
}

getUserData(uid) { 
 return this.afs.collection("users").doc(uid).get()
}

}
 