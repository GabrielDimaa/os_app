import { Component, Inject, OnInit } from '@angular/core';
import { EquipamentoModel } from "../../../os/models/equipamento.model";
import { MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OsService } from "../../../os/services/os.service";
import { firstValueFrom } from "rxjs";
import { getMessageError } from "../../../shared/validators/validators";
import { EquipamentoService } from "../../services/equipamento.service";

@Component({
  selector: 'app-listagem-equipamentos-dialog',
  templateUrl: './listagem-equipamentos-dialog.component.html',
  styleUrls: ['./listagem-equipamentos-dialog.component.scss']
})
export class ListagemEquipamentosDialogComponent implements OnInit {
  public static configDefault(equipamentos: EquipamentoModel[]): MatDialogConfig {
    return {
      data: equipamentos,
      width: '600px',
    };
  }

  public formGroup!: FormGroup;

  public equipamentos: EquipamentoModel[] = [];

  public loading: boolean = false;
  public error: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EquipamentoModel[],
    private formBuilder: FormBuilder,
    private service: EquipamentoService
  ) {
    this.equipamentos = data ?? [];
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.loading = true;

      this.formGroup = this.formBuilder.group({
        equipamento: ["", Validators.required],
        equipamentoItem: ["", Validators.required],
      });

      if (this.equipamentos.length == 0) {
        this.equipamentos = await firstValueFrom(this.service.getEquipamentos());
      }
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  }

  public async onSubmit(): Promise<void> {
    try {
      this.loading = true;

      if (this.formGroup.invalid) return;
      this.formGroup.disable();
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
      this.formGroup.enable();
    }
  }

  public getError(control: any): string {
    return getMessageError(control);
  }
}
