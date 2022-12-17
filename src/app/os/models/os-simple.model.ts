import { OsSituacaoAPI, OsSituacaoModel } from "./os-situacao.model";
import { OsTipoAtendimentoAPI, OsTipoAtendimentoModel } from "./os-tipo-atendimento.model";
import { ClienteAPI, ClienteModel } from "./cliente.model";

class OsSimpleModel {
  id: number;
  codigo: number;
  dataHora: Date;
  observacao: string | null;
  inativo: boolean;
  situacao: OsSituacaoModel;
  tipoAtendimento: OsTipoAtendimentoModel;
  cliente: ClienteModel;

  constructor(
    id: number,
    codigo: number,
    dataHora: Date,
    observacao: string | null,
    inativo: boolean,
    situacao: OsSituacaoModel,
    tipoAtendimento: OsTipoAtendimentoModel,
    cliente: ClienteModel
  ) {
    this.id = id;
    this.codigo = codigo;
    this.dataHora = dataHora;
    this.observacao = observacao;
    this.inativo = inativo;
    this.situacao = situacao;
    this.tipoAtendimento = tipoAtendimento;
    this.cliente = cliente;
  }

  public static fromJson(json: OsSimpleAPI): OsSimpleModel {
    return new OsSimpleModel(
      json.id_os,
      json.os_codigo,
      json.data_hora,
      json.obs,
      json.inativo,
      OsSituacaoModel.fromJson(json.situacao),
      OsTipoAtendimentoModel.fromJson(json.tipo_atendimento),
      ClienteModel.fromJson(json.cliente),
    );
  }
}

interface OsSimpleAPI {
  id_os: number,
  os_codigo: number,
  data_hora: Date,
  obs: string | null,
  inativo: boolean,
  situacao: OsSituacaoAPI,
  tipo_atendimento: OsTipoAtendimentoAPI,
  cliente: ClienteAPI
}

export { OsSimpleModel, OsSimpleAPI };

