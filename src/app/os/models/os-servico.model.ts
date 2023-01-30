import { UsuarioAPI, UsuarioModel } from "./usuario.model";
import { ServicoAPI, ServicoModel } from "./servico.model";
import { dateWithoutTimezone } from "../../shared/prototypes/date.prototype";

class OsServicoModel {
  id: number;
  idOsEquipamentoItem: number;
  qtd: string;
  valorTotal: number | null;
  descricaoInformada: string | null;
  dataHora: Date | null;
  servico: ServicoModel;
  usuario: UsuarioModel | null;

  constructor(
    id: number,
    idOsEquipamentoItem: number,
    qtd: string,
    valorTotal: number | null,
    descricaoInformada: string | null,
    dataHora: Date | null,
    servico: ServicoModel,
    usuario: UsuarioModel | null
  ) {
    this.id = id;
    this.idOsEquipamentoItem = idOsEquipamentoItem;
    this.qtd = qtd;
    this.valorTotal = valorTotal;
    this.descricaoInformada = descricaoInformada;
    this.dataHora = dataHora;
    this.servico = servico;
    this.usuario = usuario;
  }

  public static fromJson(json: OsServicoAPI): OsServicoModel {
    return new OsServicoModel(
      json.id_os_servico,
      json.id_os_equipamento_item,
      json.qtd,
      json.valor_total,
      json.descricao_informada,
      json.data_hora ? dateWithoutTimezone(json.data_hora) : null,
      ServicoModel.fromJson(json.servico),
      json.usuario != null ? UsuarioModel.fromJson(json.usuario) : null
    );
  }
}

interface OsServicoAPI {
  id_os_servico: number;
  id_os_equipamento_item: number;
  qtd: string;
  valor_total: number | null,
  descricao_informada: string | null,
  data_hora: string | null,
  servico: ServicoAPI,
  usuario: UsuarioAPI | null;
}

export { OsServicoModel, OsServicoAPI };
