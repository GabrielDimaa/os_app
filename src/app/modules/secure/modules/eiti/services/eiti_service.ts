import { Injectable } from "@angular/core";
import { ApiHttpClient } from "../../../../../shared/api/api-http-client";
import { catchError, map, Observable, throwError } from "rxjs";
import EitiTarefaEntity from "../entities/eiti_tarefa.entity";
import EitiTarefaModel from "../models/eiti_tarefa.model";

@Injectable({
  providedIn: 'root'
})
export class EitiService {
  constructor(private api: ApiHttpClient) {}

  public save(entity: EitiTarefaEntity): Observable<EitiTarefaEntity> {
    return this.api.post<EitiTarefaModel>("eiti/tarefa", entity.toModel())
      .pipe(
        map(response => EitiTarefaEntity.fromModel(response)),
        catchError(err => throwError(() => Error(err.message)))
      );
  }
}
