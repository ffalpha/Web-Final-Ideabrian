import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-catagory-card',
  templateUrl: './catagory-card.component.html',
  styleUrls: ['./catagory-card.component.scss']
})
export class CatagoryCardComponent implements OnInit {

   
  @Input() image : string; 
  @Input() title : string;
  constructor() { }
  
  ngOnInit() {
  }

}
