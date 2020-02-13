import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app'; 
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
 
  
 
 uid:string ;

  constructor (private afs:AngularFirestore){
      firebase.auth().onAuthStateChanged(
        user=>{
        //    console.log(JSON.stringify(user,null,2)); 
            this.uid = user.uid;
          } 
      );
   } 

  getUser(){ 
    const user = JSON.parse(localStorage.getItem('user')); 
    const uid = user.replace('"',"").replace('"',""); 
    return this.afs.collection("users").doc(uid).get()
     
    }

  //getting user details from another user
  getDetails(uidRow){ 
    console.log(this.afs.collection("users").doc(uidRow).get());
    return this.afs.collection("users").doc(uidRow).get()
  }  

}




 
