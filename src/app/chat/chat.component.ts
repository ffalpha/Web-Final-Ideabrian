import { Component, OnInit } from '@angular/core';
import {ChatServiceService,Chat} from './chat-service.service';
import {FormGroup,FormControl,Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetailsService } from '../common/user-details.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
 
  usersUID: any;
  constructor(public chatservice:ChatServiceService,private afs: AngularFirestore,private usersd:UserDetailsService) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.usersUID = user['uid'].replace('"', "").replace('"', "");
    console.log(this.usersUID);
  }

  chats:any;
  users:any;
  userCollection: AngularFirestoreCollection<any>;
  collection: any;
  ngOnInit() {
    this.getall();
    this.getalluser();
  }
   

  public chatforum=new FormGroup({
    Msg:new FormControl('',Validators.required),
   });

    //send message
  public async sendmsg(formData:Chat){
    await this.chatservice.sendmessage(formData);  
  }


   //geting all chats
   getall(){
    this.chats =this.chatservice.getallChats() ;
    
  }
  getalluser(){
    this.userCollection = this.afs.collection<any>('users');
    this.collection = this.userCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
    
  }
}
