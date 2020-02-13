import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoviewComponent } from './videoview/videoview.component';
import { UploadFormComponent} from './upload-form/upload-form.component';
import {GalleryComponent} from './gallery/gallery.component'
import {FileviewComponent} from './fileview/fileview.component'

const routes: Routes = [
  { path: "", component: HomeComponent,},
  { path: 'upload-form', component: UploadFormComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'fileview', component: FileviewComponent },
  { path: 'videoview', component: VideoviewComponent },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RccenterRoutingModule { }
