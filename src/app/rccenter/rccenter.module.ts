import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RccenterRoutingModule } from './rccenter-routing.module';
import { FileviewComponent } from './fileview/fileview.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { VideoviewComponent } from './videoview/videoview.component';

@NgModule({
  declarations: [FileviewComponent, GalleryComponent, HomeComponent, UploadFormComponent, VideoviewComponent],
  imports: [
    CommonModule,
    RccenterRoutingModule,MDBBootstrapModule ,
    ReactiveFormsModule
  ]
})
export class RccenterModule { }
