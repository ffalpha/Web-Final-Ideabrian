import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './IssueCenter/algolia-posts/post/post.component'; 
import { PostWriterComponent } from './IssueCenter/post-writer/post-writer.component';
import { MDBBootstrapModule ,DropdownModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { AlgoliaPostsComponent } from './IssueCenter/algolia-posts/algolia-posts.component';
import { NgAisModule} from 'angular-instantsearch';
import { CatagoryPageComponent } from './IssueCenter/catagory-page/catagory-page.component'; 
import { CatagoryCardComponent } from './IssueCenter/catagory-page/catagory-card/catagory-card.component'; 

//angulr fire 2 related imports
import { AngularFireDatabase } from 'angularfire2/database';  
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireStorage } from '@angular/fire/storage';
import { ReadMorePageComponent } from './IssueCenter/read-more-page/read-more-page.component';
import { AnswerComponent } from './IssueCenter/answer/answer.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignupFormComponent } from './login/signup-form/signup-form.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './login/varify-email/varify-email.component';
import { ProfileComponent } from './profile/profile.component'; 

//login realted service 
import { AuthService } from "../app/login/services/auth.service";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NavbarComponent } from './navbar/navbar.component'
import { NotificationsComponent } from './notifications/notifications.component';

//notifications 
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChatComponent } from './chat/chat.component';
import { HomePageComponent } from './home-page/home-page.component'; 

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDOoUjEoiLPF7sW7o4KyWEyyirvvsqidDU",
  authDomain: "ideabrain-d419f.firebaseapp.com",
  databaseURL: "https://ideabrain-d419f.firebaseio.com",
  projectId: "ideabrain-d419f",
  storageBucket: "ideabrain-d419f.appspot.com",
  messagingSenderId: "893231056319",
  appId: "1:893231056319:web:c41f8100b752d920b64d0a",
  measurementId: "G-XWCD20CMJ6"
}; 



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostWriterComponent , 
    AlgoliaPostsComponent, 
    CatagoryPageComponent, 
    CatagoryCardComponent, 
    ReadMorePageComponent, 
    AnswerComponent, 
    LoginFormComponent, 
    SignupFormComponent, 
    ForgotPasswordComponent, 
    VarifyEmailComponent, 
    ProfileComponent, 
    NavbarComponent, 
    NotificationsComponent, 
    ChatComponent, 
    HomePageComponent, 
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot() ,
    MDBBootstrapModule.forRoot(),  
    QuillModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, 
    NgAisModule.forRoot(),
    AngularFireAuthModule,
 
  ],
  providers: [AngularFirestore,AngularFireDatabase,AngularFireStorage,AuthService , DropdownModule],
  bootstrap: [AppComponent]
})
export class AppModule { }