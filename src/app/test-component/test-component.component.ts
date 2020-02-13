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
  
   userService.getUser().subscribe(async doc => {
      this.userDetails = await doc.data();
    });

    console.log(JSON.stringify(this.userDetails,null,2));
   }
  ngOnInit() {}
}
