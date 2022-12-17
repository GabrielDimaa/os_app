class OsTipoAtendimentoModel {
  id: number;
  descricao: string;

  constructor(id: number, descricao: string) {
    this.id = id;
    this.descricao = descricao;
  }

  public static fromJson(json: OsTipoAtendimentoAPI): OsTipoAtendimentoModel {
    return new OsTipoAtendimentoModel(
      json.id_os_tipo_atendimento,
      json.tipo_atendimento,
    );
  }
}

interface OsTipoAtendimentoAPI {
  id_os_tipo_atendimento: number;
  tipo_atendimento: string;
}

export { OsTipoAtendimentoModel, OsTipoAtendimentoAPI };
