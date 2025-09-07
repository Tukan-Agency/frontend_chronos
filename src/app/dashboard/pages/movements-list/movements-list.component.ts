import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.css']
})
export class MovementsListComponent implements OnInit {
  role: number = this.authService.getRole();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
