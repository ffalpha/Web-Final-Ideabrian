import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';  
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
 
  
 
 uid:string ;
 user:any;

  constructor (private afs:AngularFirestore){
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user['uid'].replace('"', "").replace('"', "") 
    
   } 

  getUser(){  
    return this.afs.collection("users").doc(this.uid).get()
  }

  
}




 
