import { EquipamentoItemAPI, EquipamentoItemModel } from "./equipamento-item.model";
import { OsServicoAPI, OsServicoModel } from "./os-servico.model";
import { OsProdutoAPI, OsProdutoModel } from "./os-produto.model";

class OsEquipamentoItemModel {
  public get descricaoDisplay() {
    return `${this.equipamentoItem.equipamento!.descricao} > ${this.equipamentoItem.descricao}`;
  }

  constructor(
    public id: number | null,
    public idOs: number | null,
    public problemaReclamado: string | null,
    public problemaConstatado: string | null,
    public obs: string | null,
    public equipamentoItem: EquipamentoItemModel,
    public servicos: OsServicoModel[],
    public produtos: OsProdutoModel[]
  ) {}

  public toJson(): OsEquipamentoItemAPI {
    return {
      id_os_equipamento_item: this.id,
      id_os: this.idOs,
      id_equipamento_item: this.equipamentoItem.id,
      problema_reclamado: this.problemaReclamado,
      problema_constatado: this.problemaConstatado,
      obs: this.obs,
      equipamento_item: this.equipamentoItem.toJson(),
      servicos: this.servicos.map(s => s.toJson()),
      produtos: this.produtos.map(p => p.toJson()),
    };
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
  id_equipamento_item: number | null;
  problema_reclamado: string | null;
  problema_constatado: string | null;
  obs: string | null;
  equipamento_item: EquipamentoItemAPI;
  servicos: OsServicoAPI[];
  produtos: OsProdutoAPI[];
}

export { OsEquipamentoItemModel, OsEquipamentoItemAPI };
