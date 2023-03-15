import ClienteModel from "../models/cliente.model";

export default class ClienteEntity {
  constructor(
    public id: number,
    public nome: string,
    public inativo: boolean,
    public fone: string | null,
    public razaoSocial: string | null,
    public apelido: string | null
  ) {
  }

  public toModel(): ClienteModel {
    return {
      id_cliente: this.id,
      nome: this.nome,
      inativo: this.inativo,
      fone: this.fone,
      razao_social: this.razaoSocial,
      apelido: this.apelido,
    };
  }

  public static fromModel(model: ClienteModel): ClienteEntity {
    return new ClienteEntity(
      model.id_cliente,
      model.nome,
      model.inativo,
      model.fone,
      model.razao_social,
      model.apelido
    );
  }
}
