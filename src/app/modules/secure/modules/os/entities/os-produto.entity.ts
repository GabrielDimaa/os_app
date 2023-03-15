import OsProdutoModel from "../models/os-produto.model";
import ProdutoEntity from "./produto.entity";

export default class OsProdutoEntity {
  constructor(
    public id: number,
    public qtd: string,
    public valorTotal: number,
    public idOsEquipamentoItem: number,
    public produto: ProdutoEntity,
  ) {
  }

  public toModel(): OsProdutoModel {
    return {
      id_os_produto: this.id,
      qtd: this.qtd,
      valor_total: this.valorTotal,
      id_os_equipamento_item: this.idOsEquipamentoItem,
      id_produto: this.produto.id,
      produto: this.produto.toModel(),
    };
  }

  public static fromModel(model: OsProdutoModel): OsProdutoEntity {
    return new OsProdutoEntity(
      model.id_os_produto,
      model.qtd,
      model.valor_total,
      model.id_os_equipamento_item,
      ProdutoEntity.fromModel(model.produto),
    );
  }
}
