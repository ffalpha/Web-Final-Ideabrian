import { Component, Input, Output , EventEmitter } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent  {

  constructor( private afs: AngularFirestore) { }

  @Input() ansName: string;
  @Input() ansDate: string;
  @Input() desc: string; 
  @Input() imagePath: string; 
  @Input() visibility: boolean; 
  @Input() index: number;  
  @Input() uid: string;  
  @Input() category: string; 


  @Output() visibilityEvent  = new EventEmitter<boolean>();

  //select answer 
  selectAnswer(commentNumber){
      const docRef = this.afs.collection(this.category).doc(this.uid);
      const answer = {
        status :"solved",
        answer: commentNumber
      }
      docRef.set(answer,{merge: true})
      this.visibilityEvent.emit(false);
  }
  
 
} 