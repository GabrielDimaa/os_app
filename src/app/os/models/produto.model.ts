class ProdutoModel {
  constructor(
    public id: number,
    public descricao: string
  ) {}

  public toJson(): ProdutoAPI {
    return {
      id_produto: this.id,
      descricao: this.descricao
    };
  }

  public static fromJson(json: ProdutoAPI): ProdutoModel {
    return new ProdutoModel(
      json.id_produto,
      json.descricao
    );
  }
}

interface ProdutoAPI {
  id_produto: number;
  descricao: string;
}

export { ProdutoModel, ProdutoAPI };
