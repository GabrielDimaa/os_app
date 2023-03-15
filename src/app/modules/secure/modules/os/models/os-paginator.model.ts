import OsSimpleModel from "./os-simple.model";

export default interface OsPaginatorModel {
  current_page: number;
  per_page: number;
  total: number;
  data: OsSimpleModel[];
}
