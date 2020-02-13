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

var user:any;
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  chatCollection:AngularFirestoreCollection<Chat>;
  constructor(
    private firestore: AngularFirestore,
    private user:UserDetailsService
  ) { }


  public async sendmessage(chatObj: Chat) {
    // var id = this.currrentUserId()?this.currrentUserId():""; //geting current userId
    // var email = this.afAuth.auth.currentUser.email?this.afAuth.auth.currentUser.email:"";
    


    let chat = {
      from: "Kalana",
      uid:"1123",
      message: chatObj["Msg"],
      photoUrl: "https://firebasestorage.googleapis.com/v0/b/ideabrain-d419f.appspot.com/o/profilePics%2FMauro-profile-picture.jpg?alt=media&token=7f932b54-e65f-4d6d-94b0-1c56e316a4f5",
      createdAt: new Date()
    };
   
    await this.firestore.collection("chats").add(chat);
   
  
}


  getallChats(){
    this.chatCollection= this.firestore.collection('chats')
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
}



