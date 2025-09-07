import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  role: number = this.authService.getRole();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
