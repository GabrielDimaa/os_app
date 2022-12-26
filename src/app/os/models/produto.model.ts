class ProdutoModel {
  id: number;
  descricao: string;

  constructor(id: number, descricao: string) {
    this.id = id;
    this.descricao = descricao;
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
