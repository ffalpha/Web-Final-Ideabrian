import { Component, OnInit } from '@angular/core';
import { UserDetailsService} from '../common/user-details.service'
@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
 userDetails:any;
  constructor(userService:UserDetailsService) {
  
     
   
   }
  ngOnInit() {}
}
