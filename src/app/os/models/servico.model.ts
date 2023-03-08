class ServicoModel {
  constructor(
    public id: number,
    public codigo: string,
    public descricao: string
  ) {}

  public toJson(): ServicoAPI {
    return {
      id_servico: this.id,
      servico_codigo: this.codigo,
      descricao: this.descricao,
    };
  }

  public static fromJson(json: ServicoAPI): ServicoModel {
    return new ServicoModel(
      json.id_servico,
      json.servico_codigo,
      json.descricao
    );
  }
}

interface ServicoAPI {
  id_servico: number,
  servico_codigo: string,
  descricao: string
}

export { ServicoModel, ServicoAPI };
