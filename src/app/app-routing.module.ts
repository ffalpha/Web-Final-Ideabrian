import { PostWriterComponent } from './IssueCenter/post-writer/post-writer.component'; 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AlgoliaPostsComponent } from './IssueCenter/algolia-posts/algolia-posts.component'; 
import { CatagoryPageComponent } from './IssueCenter/catagory-page/catagory-page.component'; 
import { ReadMorePageComponent } from './IssueCenter/read-more-page/read-more-page.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignupFormComponent } from './login/signup-form/signup-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './login/varify-email/varify-email.component';
import { SecureInnerPages } from './login/guard/secure-inner-pages.guard';
import { AuthGuard } from './login/guard/auth.guard';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChatComponent } from './chat/chat.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TestComponentComponent } from './test-component/test-component.component';




const routes: Routes = [ 
  {path: 'newPost/:id', component: PostWriterComponent  , canActivate:[AuthGuard]}, 
  {path: 'a/:id', component: AlgoliaPostsComponent  , canActivate:[AuthGuard]}, 
  {path: '', component: CatagoryPageComponent , canActivate:[AuthGuard]}, 
  {path: 'cat', component: CatagoryPageComponent , canActivate:[AuthGuard] },   
  {path: 'readMore/:category/:uuid', component: ReadMorePageComponent , canActivate:[AuthGuard]},   
 

  //notofications 
  {path: 'not', component: NotificationsComponent },   
  {path: 't', component: TestComponentComponent},   
 

  //authentication related 
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: LoginFormComponent  , canActivate:[SecureInnerPages]},
  { path: 'register-user', component: SignupFormComponent  , canActivate:[SecureInnerPages] },
  { path: 'dashboard', component: ProfileComponent  , canActivate:[AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent  , canActivate:[SecureInnerPages] },
  { path: 'verify-email-address', component: VarifyEmailComponent ,canActivate:[SecureInnerPages]   },
 // { path: 'verify-email-address', component: VarifyEmailComponent  , canActivate:[SecureInnerPages] },



  //home and static web pages 
  { path: 'home', component: HomePageComponent  },
 
    //chat
    { path: 'chat', component: ChatComponent  , canActivate:[AuthGuard] },
 

    //resource ceneter 
    {path:"rccenter",loadChildren:()=>import("./rccenter/rccenter.module").then(m=>m.RccenterModule) },
  ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 

export class AppRoutingModule { } 