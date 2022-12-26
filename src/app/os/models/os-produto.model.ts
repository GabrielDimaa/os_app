import { ProdutoAPI, ProdutoModel } from "./produto.model";

class OsProdutoModel {
  id: number;
  qtd: string;
  valorTotal: number;
  idOsEquipamentoItem: number;
  produto: ProdutoModel;

  constructor(id: number, qtd: string, valorTotal: number, idOsEquipamentoItem: number, produto: ProdutoModel) {
    this.id = id;
    this.qtd = qtd;
    this.valorTotal = valorTotal;
    this.idOsEquipamentoItem = idOsEquipamentoItem;
    this.produto = produto;
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
  produto: ProdutoAPI;
}

export { OsProdutoModel, OsProdutoAPI };
