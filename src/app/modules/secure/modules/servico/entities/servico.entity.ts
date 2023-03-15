import ServicoModel from "../models/servico.model";

export default class ServicoEntity {
  constructor(
    public id: number,
    public codigo: string,
    public descricao: string
  ) {}

  public toModel(): ServicoModel {
    return {
      id_servico: this.id,
      servico_codigo: this.codigo,
      descricao: this.descricao,
    };
  }

  public static fromModel(model: ServicoModel): ServicoEntity {
    return new ServicoEntity(
      model.id_servico,
      model.servico_codigo,
      model.descricao
    );
  }
}
