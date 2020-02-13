import { Component, OnInit } from '@angular/core';
import {ChatServiceService,Chat} from './chat-service.service';
import {FormGroup,FormControl,Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public chatservice:ChatServiceService) {}
  chats:any;

  ngOnInit() {
    this.getall();

  }
  public chatforum=new FormGroup({
    Msg:new FormControl('',Validators.required),
    
   });

    //send message
  public async sendmsg(formData:Chat){
    console.log(formData['Msg']);
    await this.chatservice.sendmessage(formData);  
  }
  // onSendmsg(){
  //   if(this.chatforum.valid){
  //     console.log("msgsent", this.sendmsg.value);
  //   }
  // }

   //geting all chats
   getall(){
    this.chats =this.chatservice.getallChats() ;
    
  }
}
