import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoviewComponent } from './videoview/videoview.component';
import { UploadFormComponent} from './upload-form/upload-form.component';

const routes: Routes = [
  { path: "", component: HomeComponent,
  children: [
    { path: "videoview", component: VideoviewComponent},
    { path: 'upload-form', component:  UploadFormComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RccenterRoutingModule { }
