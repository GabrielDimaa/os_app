import CidadeModel from "../models/cidade.model";

export default class CidadeEntity {
  constructor(
    public id: number,
    public codigoCidade: number,
    public descricao: string,
    public codigoEstado: number,
    public siglaEstado: string,
    public populacao: number,
    public inativo: boolean
  ) {
  }

  public toModel(): CidadeModel {
    return {
      id_cidade: this.id,
      cod_cidade: this.codigoCidade,
      descricao: this.descricao,
      cod_estado: this.codigoEstado,
      sigla_estado: this.siglaEstado,
      populacao: this.populacao,
      inativo: this.inativo
    };
  }

  public static fromModel(model: CidadeModel): CidadeEntity {
    return new CidadeEntity(
      model.id_cidade,
      model.cod_cidade,
      model.descricao,
      model.cod_estado,
      model.sigla_estado,
      model.populacao,
      model.inativo
    );
  }
}
