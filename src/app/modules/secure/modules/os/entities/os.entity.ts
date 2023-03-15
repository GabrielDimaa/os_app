import OsTipoAtendimentoEntity from "./os-tipo-atendimento.entity";
import OsSituacaoEntity from "./os-situacao.entity";
import ClienteEntity from "./cliente.entity";
import OsEquipamentoItemEntity from "./os-equipamento-item.entity";
import UsuarioEntity from "./usuario.entity";
import OsModel from "../models/os.model";
import { dateWithoutTimezone } from "../../../../../shared/prototypes/date.prototype";

export default class OsEntity {
  constructor(
    public id: number | null,
    public codigo: number | null,
    public obs: string | null,
    public inativo: boolean,
    public tipoAtendimento: OsTipoAtendimentoEntity | null,
    public situacao: OsSituacaoEntity | null,
    public cliente: ClienteEntity | null,
    public equipamentosItens: OsEquipamentoItemEntity[],
    public dataHora: Date,
    public dataHoraPrevisaoEntrega: Date | null,
    public dataHoraEntrega: Date | null,
    public dataHoraAprovacao: Date | null,
    public dataHoraEncerramento: Date | null,
    public nomeContato: string | null,
    public foneContato: string | null,
    public valorOutrasDespesas: number | null,
    public valorTotal: number | null,
    public usuarioAtendente: UsuarioEntity,
    public usuarioAprovacao: UsuarioEntity | null,
    public usuarioEncerramento: UsuarioEntity | null,
    public responsavel: UsuarioEntity | null,
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

  public static novo(usuarioAtendente: UsuarioEntity): OsEntity {
    return new OsEntity(
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

  public toModel(): OsModel {
    return {
      id_os: this.id,
      os_codigo: this.codigo,
      obs: this.obs,
      inativo: this.inativo,
      id_os_tipo_atendimento: this.tipoAtendimento!.id,
      tipo_atendimento: this.tipoAtendimento!.toModel(),
      id_os_situacao: this.situacao!.id,
      situacao: this.situacao!.toModel(),
      id_cliente: this.cliente!.id,
      cliente: this.cliente!.toModel(),
      equipamentos_itens: this.equipamentosItens.map(e => e.toModel()),
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
      usuario_atendente: this.usuarioAtendente.toModel(),
      id_usuario_aprovacao: this.usuarioAprovacao?.id ?? null,
      usuario_aprovacao: this.usuarioAprovacao?.toModel() ?? null,
      id_usuario_encerramento: this.usuarioEncerramento?.id ?? null,
      usuario_encerramento: this.usuarioEncerramento?.toModel() ?? null,
      id_usuario_responsavel: this.responsavel?.id ?? null,
      responsavel: this.responsavel?.toModel() ?? null,
    };
  }

  public static fromModel(json: OsModel): OsEntity {
    return new OsEntity(
      json.id_os,
      json.os_codigo,
      json.obs,
      json.inativo,
      OsTipoAtendimentoEntity.fromModel(json.tipo_atendimento),
      OsSituacaoEntity.fromModel(json.situacao),
      ClienteEntity.fromModel(json.cliente),
      json.equipamentos_itens.map(it => OsEquipamentoItemEntity.fromModel(it)) ?? [],
      dateWithoutTimezone(json.data_hora),
      json.data_hora_previsao_entrega ? dateWithoutTimezone(json.data_hora_previsao_entrega) : null,
      json.data_hora_entrega ? dateWithoutTimezone(json.data_hora_entrega) : null,
      json.data_hora_aprovacao ? dateWithoutTimezone(json.data_hora_aprovacao) : null,
      json.data_hora_encerramento ? dateWithoutTimezone(json.data_hora_encerramento) : null,
      json.nome_contato,
      json.fone_contato,
      json.valor_outras_despesas,
      json.valor_total,
      UsuarioEntity.fromModel(json.usuario_atendente),
      json.usuario_aprovacao ? UsuarioEntity.fromModel(json.usuario_aprovacao) : null,
      json.usuario_encerramento ? UsuarioEntity.fromModel(json.usuario_encerramento) : null,
      json.responsavel ? UsuarioEntity.fromModel(json.responsavel) : null
    );
  }
}
