class ServicoModel {
  id: number;
  codigo: string;
  descricao: string;

  constructor(id: number, codigo: string, descricao: string) {
    this.id = id;
    this.codigo = codigo;
    this.descricao = descricao;
  }

  public static fromJson(json: ServicoAPI): ServicoModel {
    return new ServicoModel(
      json.id_equipamento,
      json.equipamento_codigo,
      json.descricao
    );
  }
}

interface ServicoAPI {
  id_equipamento: number,
  equipamento_codigo: string,
  descricao: string
}

export { ServicoModel, ServicoAPI };
