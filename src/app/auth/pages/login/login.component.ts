import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getMessageError } from "../../../shared/validators/validators";
import LoginModel from "../../models/login.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

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
      this.formGroup.disable();

      if (this.formGroup.invalid) return;

      const model: LoginModel = this.formGroup.value;
      await this.authService.login(model);
    } finally {
      this.loading = false;
      this.formGroup.enable();
    }
  }
}
