import { ProdutoAPI, ProdutoModel } from "./produto.model";

class OsProdutoModel {
  constructor(
    public id: number,
    public qtd: string,
    public valorTotal: number,
    public idOsEquipamentoItem: number,
    public produto: ProdutoModel,
  ) {}

  public toJson(): OsProdutoAPI {
    return {
      id_os_produto: this.id,
      qtd: this.qtd,
      valor_total: this.valorTotal,
      id_os_equipamento_item: this.idOsEquipamentoItem,
      id_produto: this.produto.id,
      produto: this.produto.toJson(),
    };
  }

  public static fromJson(json: OsProdutoAPI): OsProdutoModel {
    return new OsProdutoModel(
      json.id_os_produto,
      json.qtd,
      json.valor_total,
      json.id_os_equipamento_item,
      ProdutoModel.fromJson(json.produto),
    );
  }
}

interface OsProdutoAPI {
  id_os_produto: number;
  qtd: string;
  valor_total: number;
  id_os_equipamento_item: number;
  id_produto: number;
  produto: ProdutoAPI;
}

export { OsProdutoModel, OsProdutoAPI };
