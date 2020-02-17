import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadFormComponent} from './upload-form/upload-form.component';
import {GalleryComponent} from './gallery/gallery.component';


const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'upload-form', component: UploadFormComponent },
  { path: 'gallery', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RccenterRoutingModule { }
