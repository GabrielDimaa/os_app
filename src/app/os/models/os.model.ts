import { OsTipoAtendimentoAPI, OsTipoAtendimentoModel } from "./os-tipo-atendimento.model";
import { ClienteAPI, ClienteModel } from "./cliente.model";
import { UsuarioAPI, UsuarioModel } from "./usuario.model";
import { OsSituacaoAPI, OsSituacaoModel } from "./os-situacao.model";
import { OsEquipamentoItemAPI, OsEquipamentoItemModel } from "./os-equipamento-item.model";
import "../../shared/prototypes/date.prototype";
import { dateWithoutTimezone } from "../../shared/prototypes/date.prototype";

class OsModel {
  constructor(
  public id: number | null,
  public codigo: number | null,
  public obs: string | null,
  public inativo: boolean,
  public tipoAtendimento: OsTipoAtendimentoModel | null,
  public situacao: OsSituacaoModel | null,
  public cliente: ClienteModel | null,
  public equipamentosItens: OsEquipamentoItemModel[],
  public dataHora: Date,
  public dataHoraPrevisaoEntrega: Date | null,
  public dataHoraEntrega: Date | null,
  public dataHoraAprovacao: Date | null,
  public dataHoraEncerramento: Date | null,
  public nomeContato: string | null,
  public foneContato: string | null,
  public valorOutrasDespesas: number | null,
  public valorTotal: number | null,
  public usuarioAtendente: UsuarioModel,
  public usuarioAprovacao: UsuarioModel | null,
  public usuarioEncerramento: UsuarioModel | null,
  public responsavel: UsuarioModel | null,
  ) {}

  public get temServico(): boolean {
    return this.equipamentosItens.some(e => e.servicos.length > 0);
  }

  public get temProduto(): boolean {
    return this.equipamentosItens.some(e => e.produtos.length > 0);
  }

  public validate(): void {
    if (this.situacao == null)
      throw Error("Situação da OS não informada.");

    if (this.tipoAtendimento == null)
      throw Error("Tipo de atendimento da OS não informada.");

    if (this.cliente == null)
      throw Error("Cliente não informado.");

    if (this.usuarioAtendente == null)
      throw Error("Usuário que faz o atendimento não informado.");

    if (this.equipamentosItens.length == 0)
      throw Error("OS deve possuir no mínimo 1 equipamento.");

    if (!this.temServico && !this.temProduto && this.situacao.encerrada)
      throw Error("OS deve possuir no mínimo 1 serviço ou 1 produto.");
  }

  public toJson(): OsAPI {
    return {
      id_os: this.id,
      os_codigo: this.codigo,
      obs: this.obs,
      inativo: this.inativo,
      id_os_tipo_atendimento: this.tipoAtendimento!.id,
      tipo_atendimento: this.tipoAtendimento!.toJson(),
      id_os_situacao: this.situacao!.id,
      situacao: this.situacao!.toJson(),
      id_cliente: this.cliente!.id,
      cliente: this.cliente!.toJson(),
      equipamentos_itens: this.equipamentosItens.map(e => e.toJson()),
      data_hora: this.dataHora.toJSONLocal(),
      data_hora_previsao_entrega: this.dataHoraPrevisaoEntrega?.toJSONLocal() ?? null,
      data_hora_entrega: this.dataHoraEntrega?.toJSONLocal() ?? null,
      data_hora_aprovacao: this.dataHoraAprovacao?.toJSONLocal() ?? null,
      data_hora_encerramento: this.dataHoraEncerramento?.toJSONLocal() ?? null,
      nome_contato: this.nomeContato,
      fone_contato: this.foneContato,
      valor_outras_despesas: this.valorOutrasDespesas,
      valor_total: this.valorTotal,
      id_usuario_atendente: this.usuarioAtendente.id,
      usuario_atendente: this.usuarioAtendente.toJson(),
      id_usuario_aprovacao: this.usuarioAprovacao?.id ?? null,
      usuario_aprovacao: this.usuarioAprovacao?.toJson() ?? null,
      id_usuario_encerramento: this.usuarioEncerramento?.id ?? null,
      usuario_encerramento: this.usuarioEncerramento?.toJson() ?? null,
      id_usuario_responsavel: this.responsavel?.id ?? null,
      responsavel: this.responsavel?.toJson() ?? null,
    };
  }

  public static novo(usuarioAtendente: UsuarioModel): OsModel {
    return new OsModel(
      null,
      null,
      null,
      false,
      null,
      null,
      null,
      [],
      new Date(),
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      usuarioAtendente,
      null,
      null,
      null
    );
  }

  public static fromJson(json: OsAPI): OsModel {
    return new OsModel(
      json.id_os,
      json.os_codigo,
      json.obs,
      json.inativo,
      OsTipoAtendimentoModel.fromJson(json.tipo_atendimento),
      OsSituacaoModel.fromJson(json.situacao),
      ClienteModel.fromJson(json.cliente),
      json.equipamentos_itens.map(it => OsEquipamentoItemModel.fromJson(it)) ?? [],
      dateWithoutTimezone(json.data_hora),
      json.data_hora_previsao_entrega ? dateWithoutTimezone(json.data_hora_previsao_entrega) : null,
      json.data_hora_entrega ? dateWithoutTimezone(json.data_hora_entrega) : null,
      json.data_hora_aprovacao ? dateWithoutTimezone(json.data_hora_aprovacao) : null,
      json.data_hora_encerramento ? dateWithoutTimezone(json.data_hora_encerramento) : null,
      json.nome_contato,
      json.fone_contato,
      json.valor_outras_despesas,
      json.valor_total,
      UsuarioModel.fromJson(json.usuario_atendente),
      json.usuario_aprovacao ? UsuarioModel.fromJson(json.usuario_aprovacao) : null,
      json.usuario_encerramento ? UsuarioModel.fromJson(json.usuario_encerramento) : null,
      json.responsavel ? UsuarioModel.fromJson(json.responsavel) : null
    );
  }
}

interface OsAPI {
  id_os: number | null;
  os_codigo: number | null;
  obs: string | null;
  inativo: boolean;
  id_os_tipo_atendimento: number,
  tipo_atendimento: OsTipoAtendimentoAPI;
  id_os_situacao: number,
  situacao: OsSituacaoAPI;
  id_cliente: number,
  cliente: ClienteAPI;
  equipamentos_itens: OsEquipamentoItemAPI[];
  data_hora: string;
  data_hora_previsao_entrega: string | null;
  data_hora_entrega: string | null;
  data_hora_aprovacao: string | null;
  data_hora_encerramento: string | null;
  nome_contato: string | null;
  fone_contato: string | null;
  valor_outras_despesas: number | null;
  valor_total: number | null;
  id_usuario_atendente: number,
  usuario_atendente: UsuarioAPI;
  id_usuario_aprovacao: number | null;
  usuario_aprovacao: UsuarioAPI | null;
  id_usuario_encerramento: number | null;
  usuario_encerramento: UsuarioAPI | null;
  id_usuario_responsavel: number | null;
  responsavel: UsuarioAPI | null;
}

export { OsModel, OsAPI };
