import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
export interface Chat {
  message: string;
  displayname: string;
  profilepic: string;
  uid: string;
  time:string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  chatCollection:AngularFirestoreCollection<Chat>;
  constructor(
    private firestore: AngularFirestore,
  ) { }


  public async sendmessage(chatObj: Chat) {
    // var id = this.currrentUserId()?this.currrentUserId():""; //geting current userId
    // var email = this.afAuth.auth.currentUser.email?this.afAuth.auth.currentUser.email:"";
    
    let chat = {
     
      message: chatObj["Msg"],
      displayname: "Kalana",
      profilepic: "https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg",
      uid:"123",
      time: new Date()
    };
    console.log("asffssf");
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



