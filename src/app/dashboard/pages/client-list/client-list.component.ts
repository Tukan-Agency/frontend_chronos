import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})

export class ClientListComponent implements OnInit {
  role: number = this.authService.getRole();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
