import CidadeModel from "./cidade.model";

export default interface ClienteModel {
  id_cliente: number;
  nome: string;
  pessoa_fisica: boolean;
  razao_social: string | null;
  insc_estadual: string | null;
  cnpj: string | null;
  cpf: string | null;
  cidade: CidadeModel;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cep: string | null;
  fone: string | null;
  email: string | null;
  apelido: string | null;
  inativo: boolean;
}
