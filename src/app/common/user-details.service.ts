import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor (private afs:AngularFirestore) { } 

  getUser(){
      //if we need we could add secure hashing to keep the local storage safe 
      //use crypto js and AES to do that 
      const uidRow =  localStorage.getItem('user');
      const uid = uidRow.replace('"',"").replace('"',""); 
      return this.afs.collection("users").doc(uid).get()
    }

  //getting user details from another user
  getDetails(uidRow){ 
    console.log(this.afs.collection("users").doc(uidRow).get());
    return this.afs.collection("users").doc(uidRow).get()
  }  

}




 
