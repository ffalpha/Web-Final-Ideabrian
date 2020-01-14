import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import { FormControl } from "@angular/forms";
import { UserDetailsService } from "../../common/user-details.service";

import { Notification } from "../../common/Notification.interface";
import * as uuid from "uuid";
@Component({
  selector: "app-read-more-page",
  templateUrl: "./read-more-page.component.html",
  styleUrls: ["./read-more-page.component.scss"]
})
export class ReadMorePageComponent implements OnInit {
  
  
  documentObject: any; //real document
  docRef: any; //reference to the exact doument

  //post related
  image: any;  title: any;  name: any;  date: any;  solved: any;  body: any;  profilePic: string;

  //commnet related
  comments: any; commentCount: number; newComment: any;

  //passed parameter related
  databaseName: any; uuid: any; userObject: any;

  //notification related
  path: string;

  constructor(
    public  spy: jasmine.Spy,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private afs1: AngularFirestore,
    private user: UserDetailsService
  ) {
    this.newComment = new FormControl("");
    this.user.getUser().subscribe(async doc => {
      this.userObject = await doc.data();
    });

    this.route.params.subscribe(arg => {
      this.path = `readMore/${arg.category}/${arg.uuid}`; //path without http://localhost:4200/
      console.log(this.path);
    });
    this.databaseName = this.route.snapshot.paramMap.get("category");
    this.uuid = this.route.snapshot.paramMap.get("uuid"); 
    this.docRef = this.afs.collection(this.databaseName).doc(this.uuid);
  }

  getDate() {
    let dateTime = new Date();
    var creationDate =
      dateTime.getFullYear() +
      "/" +
      (dateTime.getMonth() + 1) +
      "/" +
      dateTime.getDate();
    return creationDate;
  }

  updateDocument() {

    //create a reference to the specific document

    //get the document from firestore
    this.docRef.get().subscribe(
      async doc => {
        if (doc.exists) {
          this.documentObject = await doc.data();
          this.image = this.documentObject["image"];
          this.profilePic = this.documentObject["profilePic"];
          this.title = this.documentObject["title"];
          this.name = this.documentObject["name"];
          this.date = this.documentObject["date"];
          this.solved = this.documentObject["solved"];
          this.body = this.documentObject["body"];

          //JSON mapping of objects to array
          //check for undefined
          this.commentCount = this.documentObject["comments"]["0"];

          var arr_names: Object[] = new Array(this.commentCount);

          //count the number of comments
          for (var a = 1; a < this.commentCount + 1; a++) {
            arr_names[a - 1] = this.documentObject["comments"][a];
          }

          this.comments = arr_names;
        } else {
          console.log("No such document!");
        }
      },
      error => {
        console.log("Error getting document:", error);
      }
    );
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get("uuid") != null) {
      this.updateDocument();
    }
 
  }
  insertDocument() {
    //create JSON object and push it into firestore

    //update number of comments
    this.commentCount += 1; //increment comment count by one
    this.documentObject["comments"]["0"] = this.commentCount;

    //create and update the comment count
    var newObject = {
      name: this.userObject["displayName"],
      profilePic: this.userObject["photoURL"],
      desc: this.newComment.value,
      ansDate: this.getDate()
    };
    this.documentObject["comments"][this.commentCount] = newObject;

    //push the document into the firestore
    this.afs
      .collection(this.databaseName)
      .doc(this.uuid)
      .set(this.documentObject);
 
    //this.afs.collection('Notifications').doc(this.uuid+'/comments').set(this.documentObject);  <- unsure to delete line
    // Create the notification
 
   

    //adding data to the notification collection
    this.docRef.get().subscribe(
      async doc => {
        this.documentObject = await doc.data();
        this.name = this.documentObject["name"];
        console.log(JSON.stringify(this.documentObject['uuid']));
        const newEvent: Notification = {
          uid: this.documentObject["uuid"],           //6FL1VSTwClTKZB0TSkvrZQgOPIo2
          id: uuid.v4(),     
          title: this.documentObject["title"],
          postedBy: this.userObject["displayName"],
          time: this.getDate(),
          url: this.path,
          seen: false
        };
        console.log(JSON.stringify(newEvent));  
        this.afs
        .collection("Notifications")
        .doc( this.documentObject["uid"])
        .collection( this.documentObject["uid"])
        .doc(newEvent.id)
        .set(newEvent);
      }
    );
 
    //remove the value in input box
    this.newComment.setValue("");
    this.updateDocument();
  }


  refresh(){
    this.updateDocument();
  }




}
