import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RccenterRoutingModule } from './rccenter-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UploadFormComponent } from './upload-form/upload-form.component';


@NgModule({
  declarations: [ GalleryComponent, HomeComponent, UploadFormComponent],
  imports: [
    CommonModule,
    RccenterRoutingModule,MDBBootstrapModule ,
    ReactiveFormsModule
  ]
})
export class RccenterModule { }
