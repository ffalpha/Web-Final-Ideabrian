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
            console.log(JSON.stringify(user,null,2)); 
            this.uid = user.uid;
          } 
      );
   } 

  getUser(){ 
      if(localStorage.getItem('user')==  this.uid ){
        const uidLocal = this.uid.replace('"',"").replace('"',""); 
        console.log(uidLocal);
        return this.afs.collection("users").doc(uidLocal).get()
      }else{
        localStorage.setItem('user', null);//log out if any change detected
      }
    }

  //getting user details from another user
  getDetails(uidRow){ 
    console.log(this.afs.collection("users").doc(uidRow).get());
    return this.afs.collection("users").doc(uidRow).get()
  }  

}




 
