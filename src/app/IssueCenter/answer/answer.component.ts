import { Component, Input, Output , EventEmitter } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent  {

  isAnswer:boolean ;
  constructor( private afs: AngularFirestore) { 

    if(!this.visibility){
      if (this.answer == this.index) {
        this.isAnswer = true;
      }else{
        this.isAnswer = false;
      }
    }
    this.isAnswer = false;
  }
  
  

  @Input() ansName: string;
  @Input() ansDate: string;
  @Input() desc: string; 
  @Input() imagePath: string; 
  @Input() visibility: boolean; 
  @Input() index: number;  
  @Input() uid: string;  
  @Input() category: string; 
  @Input() answer: number; 


  @Output() visibilityEvent  = new EventEmitter<boolean>();

  //select answer 
  selectAnswer(commentNumber){
      const docRef = this.afs.collection(this.category).doc(this.uid);
      const answer = {
        status :"solved",
        answer: commentNumber
      }
      this.answer = commentNumber
      docRef.set(answer,{merge: true})
      this.visibilityEvent.emit(false);
  }
  
get isAnaswer(): boolean {
    if(!this.visibility){
      return (this.answer == this.index) ? true:false
    }
      return false
  }

  
 
} 