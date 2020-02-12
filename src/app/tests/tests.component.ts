import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth.service'
import * as firebase from  'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})

export class TestsComponent implements OnInit {

  constructor(afAuth : AngularFireAuth) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user=>{
      console.log( JSON.stringify(user,null,4));
    });
  }

}
