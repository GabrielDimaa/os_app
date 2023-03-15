import OsSituacaoModel from "../models/os-situacao.model";

export default class OsSituacaoEntity {
  constructor(
    public id: number,
    public descricao: string,
    public aprovada: boolean,
    public encerrada: boolean
  ) {
  }

  public toModel(): OsSituacaoModel {
    return {
      id_os_situacao: this.id,
      situacao: this.descricao,
      aprovada: this.aprovada,
      encerrada: this.encerrada,
    };
  }

  public static fromModel(model: OsSituacaoModel): OsSituacaoEntity {
    return new OsSituacaoEntity(
      model.id_os_situacao,
      model.situacao,
      model.aprovada,
      model.encerrada,
    );
  }
}
