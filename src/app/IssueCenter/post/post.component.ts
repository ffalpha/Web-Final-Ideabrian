import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})


export class PostComponent  {

  @Input() name: string;
  @Input() url: string;
  @Input() content: string;
  @Input() rating: string;
  @Input() date: string;
  @Input() solved: string;
  @Input() id: string;
  @Input() title: string;

  constructor() { }


}
