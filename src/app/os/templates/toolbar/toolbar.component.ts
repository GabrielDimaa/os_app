import { Component } from '@angular/core';
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public async logout() {
    try {
      this.authService.logout().finally();
    } finally {
      await this.router.navigate(['auth/login']);
    }
  }
}
