import ProdutoModel from "../models/produto.model";

export default class ProdutoEntity {
  constructor(
    public id: number,
    public descricao: string
  ) {
  }

  public toModel(): ProdutoModel {
    return {
      id_produto: this.id,
      descricao: this.descricao
    };
  }

  public static fromModel(model: ProdutoModel): ProdutoEntity {
    return new ProdutoEntity(
      model.id_produto,
      model.descricao
    );
  }
}
