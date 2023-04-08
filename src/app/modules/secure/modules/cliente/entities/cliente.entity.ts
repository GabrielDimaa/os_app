import ClienteModel from "../models/cliente.model";
import CidadeEntity from "./cidade.entity";

export default class ClienteEntity {
  constructor(
    public id: number,
    public nome: string,
    public pessoaFisica: boolean,
    public razaoSocial: string | null,
    public inscricaoEstadual: string | null,
    public cnpj: string | null,
    public cpf: string | null,
    public cidade: CidadeEntity,
    public logradouro: string | null,
    public numero: string | null,
    public complemento: string | null,
    public bairro: string | null,
    public cep: string | null,
    public fone: string[],
    public email: string | null,
    public apelido: string | null,
    public obs: string | null,
    public inativo: boolean
  ) {
  }

  public get temEndereco(): boolean {
    return this.logradouro != null || this.numero != null || this.complemento != null || this.bairro != null;
  }

  public get enderecoCompleto(): string {
    const lista = [];

    if (this.logradouro != null) lista.push(this.logradouro);
    if (this.numero != null) lista.push(this.numero);
    if (this.complemento != null) lista.push(this.complemento);
    if (this.bairro != null) lista.push(this.bairro);

    return lista.join(", ");
  }

  public toModel(): ClienteModel {
    return {
      id_cliente: this.id,
      nome: this.nome,
      pessoa_fisica: this.pessoaFisica,
      razao_social: this.razaoSocial,
      insc_estadual: this.inscricaoEstadual,
      cnpj: this.cnpj,
      cpf: this.cpf,
      cidade: this.cidade.toModel(),
      logradouro: this.logradouro,
      numero: this.numero,
      complemento: this.complemento,
      bairro: this.bairro,
      cep: this.cep,
      fone: JSON.stringify(this.fone).replace("[", "{").replace("]", "}"),
      email: this.email,
      apelido: this.apelido,
      obs: this.obs,
      inativo: this.inativo
    };
  }

  public static fromModel(model: ClienteModel): ClienteEntity {
    return new ClienteEntity(
      model.id_cliente,
      model.nome,
      model.pessoa_fisica,
      model.razao_social,
      model.insc_estadual,
      model.cnpj,
      model.cpf,
      CidadeEntity.fromModel(model.cidade),
      model.logradouro,
      model.numero,
      model.complemento,
      model.bairro,
      model.cep,
      model.fone?.slice(1, -1).replace(new RegExp('\\\"', 'g'), "").split(",") ?? [],
      model.email,
      model.apelido,
      model.obs,
      model.inativo
    );
  }
}
