import { Component, OnInit } from '@angular/core'; 
import { environment } from '../../../environments/environment';
import { ActivatedRoute , Router} from '@angular/router'
import { selector1 } from '../../catagory';

@Component({
  selector: 'app-algolia-posts',
  templateUrl: './algolia-posts.component.html',
  styleUrls: ['./algolia-posts.component.scss']
})
 
export class AlgoliaPostsComponent implements OnInit {
  public postCatagory;
  public postCatagoryLowecase;
  public databaseName;
  public id;

  public routerLink;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    
    if(this.route.snapshot.paramMap.get('id')!=null){ 
      //get database name using URL
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.postCatagory = selector1.test(this.id);
      this.postCatagoryLowecase = this.postCatagory.toLowerCase();
      this.databaseName = this.postCatagory.replace(" ","_").replace(" ","_");
      this.routerLink = "../../newPost/" + this.id;
 
    }else{
      this.postCatagory = "error";
    }
  } 

   //there will be no search results as default
   showResults = false ;

   //change search results showing status 
   searchChanged(query){
     if(query.length){
       this.showResults = true;
     }else{
       this.showResults = false;
     }

    }

  
   


  
 
















}
