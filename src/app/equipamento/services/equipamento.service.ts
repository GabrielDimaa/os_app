import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { catchError, map, Observable, throwError } from "rxjs";
import EquipamentoEntity from "../entities/equipamento.entity";
import EquipamentoModel from "../models/equipamento.model";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  constructor(private api: ApiHttpClient) {}

  public getEquipamentos(): Observable<EquipamentoEntity[]> {
    return this.api.get<EquipamentoModel[]>("equipamento")
      .pipe(
        map(response => response.map(e => EquipamentoEntity.fromModel(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }
}
