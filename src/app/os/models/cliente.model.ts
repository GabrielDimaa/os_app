class ClienteModel {
  constructor(
    public id: number,
    public nome: string,
    public inativo: boolean,
    public fone: string | null,
    public razaoSocial: string | null,
    public apelido: string | null
  ) {}

  public toJson(): ClienteAPI {
    return {
      id_cliente: this.id,
      nome: this.nome,
      inativo: this.inativo,
      fone: this.fone,
      razao_social: this.razaoSocial,
      apelido: this.apelido,
    };
  }

  public static fromJson(json: ClienteAPI): ClienteModel {
    return new ClienteModel(
      json.id_cliente,
      json.nome,
      json.inativo,
      json.fone,
      json.razao_social,
      json.apelido
    );
  }
}

interface ClienteAPI {
  id_cliente: number,
  nome: string,
  inativo: boolean,
  fone: string | null,
  razao_social: string | null,
  apelido: string | null
}

export { ClienteModel, ClienteAPI };
