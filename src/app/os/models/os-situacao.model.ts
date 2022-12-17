class OsSituacaoModel {
  id: number;
  descricao: string;
  aprovada: boolean;

  constructor(id: number, descricao: string, aprovada: boolean) {
    this.id = id;
    this.descricao = descricao;
    this.aprovada = aprovada;
  }

  public static fromJson(json: OsSituacaoAPI): OsSituacaoModel {
    return new OsSituacaoModel(
      json.id_os_situacao,
      json.situacao,
      json.aprovada,
    );
  }
}

interface OsSituacaoAPI {
  id_os_situacao: number;
  situacao: string;
  aprovada: boolean;
}

export { OsSituacaoModel, OsSituacaoAPI };
