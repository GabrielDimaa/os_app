import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";
import UsuarioEntity from "../../modules/os/entities/usuario.entity";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public usuario!: UsuarioEntity | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.usuario = this.authService.getUsuarioLogado();

    if (this.usuario == null)
      this.router.navigate(['auth/login']).then();
  }

  public async logout() {
    try {
      this.authService.logout().finally();
    } finally {
      await this.router.navigate(['auth/login']);
    }
  }
}
