import { Component, OnInit } from '@angular/core'; 
import { environment } from '../../../environments/environment';
import { ActivatedRoute , Router} from '@angular/router'
import { selector } from '../../common/catagory';

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
      console.log("ID is not null");
      console.log(parseInt(this.route.snapshot.paramMap.get('id')));
      console.log(selector.select(parseInt(this.route.snapshot.paramMap.get('id'))).toLowerCase());
      
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      
      this.postCatagory = selector.select(this.id);
      this.postCatagoryLowecase = this.postCatagory.toLowerCase();
      this.databaseName = this.postCatagory.replace(" ","_").replace(" ","_");
      this.routerLink = "../../newPost/"+this.id;
 
    }else{
      this.postCatagory = "error";
    }
  } 
   
  

  
   


  
 
















}
