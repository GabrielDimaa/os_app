import { EquipamentoItemAPI, EquipamentoItemModel } from "./equipamento-item.model";
import { OsServicoAPI, OsServicoModel } from "./os-servico.model";
import { OsProdutoAPI, OsProdutoModel } from "./os-produto.model";

class OsEquipamentoItemModel {
  id: number | null;
  idOs: number | null;
  problemaReclamado: string | null;
  problemaConstatado: string | null;
  obs: string | null;
  equipamentoItem: EquipamentoItemModel;
  servicos: OsServicoModel[];
  produtos: OsProdutoModel[];

  public get descricaoDisplay() {
    return `${this.equipamentoItem.equipamento!.descricao} > ${this.equipamentoItem.descricao}`;
  }

  static novo(equipamentoItem: EquipamentoItemModel, idOs: number | null = null): OsEquipamentoItemModel {
    return new OsEquipamentoItemModel(
      null,
      idOs,
      null,
      null,
      null,
      equipamentoItem,
      [],
      []
    );
  }

  constructor(
    id: number | null,
    idOs: number | null,
    problemaReclamado: string | null,
    problemaConstatado: string | null,
    obs: string | null,
    equipamentoItem: EquipamentoItemModel,
    servicos: OsServicoModel[],
    produtos: OsProdutoModel[]
  ) {
    this.id = id;
    this.idOs = idOs;
    this.problemaReclamado = problemaReclamado;
    this.problemaConstatado = problemaConstatado;
    this.obs = obs;
    this.equipamentoItem = equipamentoItem;
    this.servicos = servicos;
    this.produtos = produtos;
  }

  public static fromJson(json: OsEquipamentoItemAPI): OsEquipamentoItemModel {
    return new OsEquipamentoItemModel(
      json.id_os_equipamento_item,
      json.id_os,
      json.problema_reclamado,
      json.problema_constatado,
      json.obs,
      EquipamentoItemModel.fromJson(json.equipamento_item),
      json.servicos.map(s => OsServicoModel.fromJson(s)),
      json.produtos.map(p => OsProdutoModel.fromJson(p))
    );
  }
}

interface OsEquipamentoItemAPI {
  id_os_equipamento_item: number | null;
  id_os: number | null;
  problema_reclamado: string | null;
  problema_constatado: string | null;
  obs: string | null;
  equipamento_item: EquipamentoItemAPI;
  servicos: OsServicoAPI[];
  produtos: OsProdutoAPI[];
}

export { OsEquipamentoItemModel, OsEquipamentoItemAPI };
