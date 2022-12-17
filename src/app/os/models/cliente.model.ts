class ClienteModel {
  id: number;
  nome: string;
  inativo: boolean;
  fone: string | null;
  razaoSocial: string | null;
  apelido: string | null;

  constructor(id: number, nome: string, inativo: boolean, fone: string | null, razaoSocial: string | null, apelido: string | null) {
    this.id = id;
    this.nome = nome;
    this.inativo = inativo;
    this.fone = fone;
    this.razaoSocial = razaoSocial;
    this.apelido = apelido;
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
