class OsSituacaoModel {
  constructor(
    public id: number,
    public descricao: string,
    public aprovada: boolean,
    public encerrada: boolean
  ) {}

  public static fromJson(json: OsSituacaoAPI): OsSituacaoModel {
    return new OsSituacaoModel(
      json.id_os_situacao,
      json.situacao,
      json.aprovada,
      json.encerrada,
    );
  }
}

interface OsSituacaoAPI {
  id_os_situacao: number;
  situacao: string;
  aprovada: boolean;
  encerrada: boolean;
}

export { OsSituacaoModel, OsSituacaoAPI };
