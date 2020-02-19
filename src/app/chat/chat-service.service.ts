import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import {UserDetailsService} from '../common/user-details.service'
export interface Chat {
  message: string;
  displayname: string;
  profilepic: string;
  uid: string;
  time:string;
  
}

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified:string;
  loggedWith:string;
  uid:string;
  
}

 
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
   userid:any;
  user:any;
  chatCollection:AngularFirestoreCollection<Chat>;
  userCollection:AngularFirestoreCollection<User>;
  afs:any
  constructor(
    private firestore: AngularFirestore,
    private usersd:UserDetailsService
  ) {

//user details
    this.usersd.getUser().subscribe(async doc=>{
      this.user =await doc.data();
      console.log(JSON.stringify(this.user,null,2));
      this.userid=this.user['uid'];
    });
   }


  public async sendmessage(chatObj: Chat) {
   var user=this.usersd.getUser().subscribe(
     
   )
  
    let chat = {
      from: this.user['email'],
      uid:this.user['uid'],
      message: chatObj["Msg"],
      photoURL: this.user['photoURL'],
      createdAt: new Date(),
      type : 'text'
    };
   
    await this.firestore.collection("chats").add(chat);
   
  
}

//get chat data from database
  getallChats(){
    //firebase api
    this.chatCollection= this.firestore.collection('chats',ref => ref.orderBy('createdAt', 'asc'))
    return this.chatCollection.snapshotChanges().pipe(
      map(actions => {
         return actions.map(a => {
          const data = a.payload.doc.data() as Chat;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }



getallUsers(){
  this.userCollection= this.firestore.collection('users')
  return this.userCollection.snapshotChanges().pipe(
    map(actions => {
       return actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}
}



