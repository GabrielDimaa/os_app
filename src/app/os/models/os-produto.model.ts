import ProdutoModel from "./produto.model";

export default interface OsProdutoModel {
  id_os_produto: number;
  qtd: string;
  valor_total: number;
  id_os_equipamento_item: number;
  id_produto: number;
  produto: ProdutoModel;
}
