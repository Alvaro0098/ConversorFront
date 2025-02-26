import { Component } from '@angular/core';
import { DataUserService } from '../../services/data-user.service';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAdmin: boolean = false;

  constructor(private authService: DataUserService) {
    this.isAdmin = this.authService.getUserRole() === 'admin';
  }
}
