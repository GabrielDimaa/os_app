class OsTipoAtendimentoModel {
  constructor(
    public id: number,
    public descricao: string
  ) {}

  public toJson(): OsTipoAtendimentoAPI {
    return {
      id_os_tipo_atendimento: this.id,
      tipo_atendimento: this.descricao,
    };
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
