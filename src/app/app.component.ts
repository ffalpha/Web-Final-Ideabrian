import { Component } from '@angular/core';

import { NotificationsService } from 'angular2-notifications'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private noti:NotificationsService){
 
  }

  title = 'postsandanswers';

  createNotification(message){
    console.log("Button clicked ");
    this.noti.success('Item created!', message, {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true
    });
  }
}
