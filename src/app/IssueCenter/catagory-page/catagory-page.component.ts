import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catagory-page',
  templateUrl: './catagory-page.component.html',
  styleUrls: ['./catagory-page.component.scss']
})
export class CatagoryPageComponent implements OnInit {
 

  constructor(private router: Router) {}

 
 public images = ['./../../assets/catagoryImages/2.jpg','./../../assets/catagoryImages/1.jpg','./../../assets/catagoryImages/3.jpg','./../../assets/catagoryImages/4.jpg','./../../assets/catagoryImages/5.jpg','./../../assets/catagoryImages/6.jpg'];
  
 public titles = ['Agriculture and cropes' , 'Health and fitness' , 'Education' , 'Science and technology' , 'Money and finance' , 'Vehicles and transport']; 
 
 public links =   ['../a/1' ,'../a/2' ,'../a/3' ,'../a/4' ,'../a/5' ,'../a/6' ,  ]


  ngOnInit( ) {}

 
}