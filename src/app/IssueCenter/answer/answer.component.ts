import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent  {

  constructor() { }

  @Input() ansName: string;
  @Input() ansDate: string;
  @Input() desc: string; 
  @Input() imagePath: string; 
} 