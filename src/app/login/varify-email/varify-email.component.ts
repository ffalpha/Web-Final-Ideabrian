import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-varify-email',
  templateUrl: './varify-email.component.html',
  styleUrls: ['./varify-email.component.scss']
})
export class VarifyEmailComponent implements OnInit {

  constructor( public authService: AuthService) { }

  ngOnInit() {
  }

}
