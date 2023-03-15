import OsTipoAtendimentoModel from "../models/os-tipo-atendimento.model";

export default class OsTipoAtendimentoEntity {
  constructor(
    public id: number,
    public descricao: string
  ) {}

  public toModel(): OsTipoAtendimentoModel {
    return {
      id_os_tipo_atendimento: this.id,
      tipo_atendimento: this.descricao,
    };
  }

  public static fromModel(model: OsTipoAtendimentoModel): OsTipoAtendimentoEntity {
    return new OsTipoAtendimentoEntity(
      model.id_os_tipo_atendimento,
      model.tipo_atendimento,
    );
  }
}
