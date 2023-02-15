import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { catchError, map, Observable, throwError } from "rxjs";
import { EquipamentoAPI, EquipamentoModel } from "../../os/models/equipamento.model";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  constructor(private api: ApiHttpClient) {}

  public getEquipamentos(): Observable<EquipamentoModel[]> {
    return this.api.get<EquipamentoAPI[]>("equipamento")
      .pipe(
        map(response => response.map(e => EquipamentoModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }
}
