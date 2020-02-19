import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'; 
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
 
 uid:string ;
 user:any;

 
  constructor (private afs:AngularFirestore){
    //get user object from local storage 
    const user = JSON.parse(localStorage.getItem('user'));
    //get uid from that 
    this.uid = user['uid'].replace('"', "").replace('"', "") 
    
  } 

  //return user profile info using the data stored in the database 
  getUser(){  
    return this.afs.collection("users").doc(this.uid).get()
  }

  
}




 
