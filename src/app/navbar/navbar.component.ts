import { Component } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { skip } from "rxjs/operators";
import { Notification } from "../common/Notification.interface";
import { NotificationsService } from "angular2-notifications";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../login/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  //create the bell icon ring + notification bubble
  public newNotifications: boolean;
  private notificationCollection: AngularFirestoreCollection<Notification>;
  notification: Observable<Notification[]>;
  private usersUID: string;
  notificationsCollection: AngularFirestoreCollection<Notification>;

  constructor(public afs: AngularFirestore,private notify: NotificationsService,private router: ActivatedRoute,private auth: AuthService) {
    this.usersUID = localStorage.getItem("user").replace('"', "").replace('"', "");  
    this.newNotifications = false;
    this.notificationCollection = afs.collection<Notification>(`Notifications/${this.usersUID}/${this.usersUID}/`); //5xmXcPPVmPgWi4uttnN2v6rrMmD2/fEsNdG9LaHNPK2f3LYuH/
    this.notification = this.notificationCollection.valueChanges();
    console.log(this.usersUID);
    
    //don't display notifications in the detailed notification page
    if (this.router.pathFromRoot.toString() =="Route(url:'', path:''),Route(url:'not', path:'not')"){
      console.log("You are in notification page ");
    }else{ 
      console.log("You are not in notification page ");
      this.notification.pipe(skip(1)).subscribe(
        //skip the inital notification message
        notification => {  
          this.newNotifications = true;  
          this.createNotification( );
        },
        err => console.log(err),
        () => console.log("stream is finished")
      );
    }
  }

  update(notification: Notification) {
    this.notificationsCollection.add(notification);
  }
  //properties of bottom notification
  createNotification( ) {
    console.log("Button clicked ");
    this.notify.success("New answer added !", "Check  notifications ", {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true,
      maxStack:1
    });
  }

  ngOnDestroy() {
    if (this.notification !== null) {
      this.notification == null;
      console.log("Obseravable object destroyed !");
    }
  }
}
