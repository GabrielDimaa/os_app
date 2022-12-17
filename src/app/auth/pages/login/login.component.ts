import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getMessageError } from "../../../shared/validators/validators";
import { LoginModel } from "../../models/login.model";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../../../shared/components/snackbar/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
  }

  loading: boolean = false;
  mostrarSenha: boolean = true;

  formGroup: FormGroup = this.formBuilder.group({
    nomeUsuario: ["", Validators.required],
    senha: ["", Validators.required]
  });

  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  getError(control: any): string {
    return getMessageError(control);
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;

      if (this.formGroup.invalid) return;
      this.formGroup.disable();

      const formData = this.formGroup.value;
      const model: LoginModel = new LoginModel(formData.nomeUsuario, formData.senha);

      await this.authService.login(model);
      await this.router.navigate(['os']);
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loading = false;
      this.formGroup.enable();
    }
  }
}
