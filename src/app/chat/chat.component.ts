import { Component, OnInit } from '@angular/core';
import {ChatServiceService,Chat} from './chat-service.service';
import {FormGroup,FormControl,Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetailsService } from '../common/user-details.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  ref: AngularFireStorageReference;
  files: File[] = [];
  usersUID: any;
  percentage: Observable<number>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  toast: any;
  constructor(public chatservice:ChatServiceService,private afs: AngularFirestore,private usersd:UserDetailsService,private afStorage: AngularFireStorage) {
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
  deleteChat(chatId) {
     if (confirm('Are you sure to delete this message?')) {
   
      this.afs.doc('chats/' + chatId).delete(); //chats database collection eken adala id eka aran service ekata yawanawa.service eken databse ekata ghn adala eka delete krnawa
    // this.toast.warning('Message was removed successfully');
  }
    }

  uploadFile(event) {
    const user = JSON.parse(localStorage.getItem('user')); //get details of current user
    const file = event.target.files[0];
    const filePath = '/chats/' + Date.now() + '-' + this.files[0]; //storage ekta yana path eka
   // const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.ref = this.afStorage.ref(filePath);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges() //returns an observable data as a synchronized array (pipe ekk wge.eka peththakin data wenas krnakota anith peththen data wenas we.)
      .pipe(           //input data transform to the desired output
        finalize(async () => {
          this.downloadURL = await this.ref.getDownloadURL().toPromise(); //storage ekn url eka collection eke doc and field ekata ganii
          this.afs.collection('chats').add({
            type : 'file',
            from: user.email,
            uid: user.uid,
            message: "",
            photoURL: user.photoURL,
            createdAt: new Date(),
            URL: this.downloadURL //staorage eken gththa url eka database akta yai
          });
        })
      )
      .subscribe();  //method on the observable type
  }
}

