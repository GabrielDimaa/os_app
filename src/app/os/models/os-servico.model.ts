import { UsuarioAPI, UsuarioModel } from "./usuario.model";
import { ServicoAPI, ServicoModel } from "./servico.model";

class OsServicoModel {
  id: number;
  idOsEquipamentoItem: number;
  qtd: string;
  servico: ServicoModel;
  usuario: UsuarioModel | null;

  constructor(id: number, idOsEquipamentoItem: number, qtd: string, servico: ServicoModel, usuario: UsuarioModel | null) {
    this.id = id;
    this.idOsEquipamentoItem = idOsEquipamentoItem;
    this.qtd = qtd;
    this.servico = servico;
    this.usuario = usuario;
  }

  public static fromJson(json: OsServicoAPI): OsServicoModel {
    return new OsServicoModel(
      json.id_os_servico,
      json.id_os_equipamento_item,
      json.qtd,
      ServicoModel.fromJson(json.servico),
      json.usuario != null ? UsuarioModel.fromJson(json.usuario) : null
    );
  }
}

interface OsServicoAPI {
  id_os_servico: number;
  id_os_equipamento_item: number;
  qtd: string;
  servico: ServicoAPI,
  usuario: UsuarioAPI | null;
}

export { OsServicoModel, OsServicoAPI };
