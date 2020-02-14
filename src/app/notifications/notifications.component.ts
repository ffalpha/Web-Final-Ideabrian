import { Component } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Notification } from "./../common/Notification.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"]
})
export class NotificationsComponent {
  private notificationsCollection: AngularFirestoreCollection<Notification>; //notification collection in firestore
  private notifications: Observable<Notification[]>; //observable to maintain the array of notifications
  private uid: string; //uid to store data
  private navigateNow: boolean = false; // skip the error of notification after navigation
  private test: boolean = false;
  constructor(public afs: AngularFirestore, private router: Router) {
    //genarate UID
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user.uid;
    //read the document
    this.notificationsCollection = afs.collection<Notification>(
      `Notifications/${this.uid}/${this.uid}/`
    );
    //watch for updates
    this.notifications = this.notificationsCollection.valueChanges();

    this.notifications.pipe().subscribe(
      notification => {
        console.log("clicked ");
        this.navigateNow = true;//fix notification after navigation issue 
      },
      err => console.log(err),
      () => console.log("Seen set to true ")
    );
  }

  ngOnDestroy() {
    if (this.notifications !== null) this.notifications == null;
  }

  update(notification: Notification) {
    this.notificationsCollection.add(notification);
  }

  //naviage to the specific path
  navigate(url, id) {
    //set notification status to > seen
    this.afs
      .collection("Notifications")
      .doc(this.uid)
      .collection(this.uid)
      .doc(id)
      .update({ seen: true });

    //navigate to the document page
    /* Naviagete to the route after the change is finished
     */

    if (this.navigateNow) {
      this.router.navigate(["/" + url]);
      this.navigateNow = false;
    }
  }
}
