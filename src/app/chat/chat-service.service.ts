import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor() { }



  getallChats(){
    this.threadCollection= this.firestore.collection('chats')
    return this.threadCollection.snapshotChanges().pipe(
      map(actions => {
         return actions.map(a => {
          const data = a.payload.doc.data() as Thread;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}



