import EitiTarefaModel from "../models/eiti_tarefa.model";

export default class EitiTarefaEntity {
  constructor(
    public osCodigo: number,
    public projeto: string,
    public tituloHistoria: string,
    public descricaoHistoria: string | null,
  ) {
  }

  public toModel(): EitiTarefaModel {
    return {
      os_codigo: this.osCodigo,
      projeto: this.projeto,
      titulo_historia: this.tituloHistoria,
      descricao_historia: this.descricaoHistoria,
    };
  }

  public static fromModel(model: EitiTarefaModel): EitiTarefaEntity {
    return new EitiTarefaEntity(
      model.os_codigo,
      model.projeto,
      model.titulo_historia,
      model.descricao_historia,
    );
  }
}
