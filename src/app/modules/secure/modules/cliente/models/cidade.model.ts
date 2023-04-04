export default interface CidadeModel {
  id_cidade: number;
  cod_cidade: number;
  descricao: string;
  cod_estado: number;
  sigla_estado: string;
  populacao: number;
  inativo: boolean
}
