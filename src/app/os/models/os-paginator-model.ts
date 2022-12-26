import { OsSimpleAPI, OsSimpleModel } from "./os-simple.model";

class OsPaginatorModel {
  currentPage: number;
  perPage: number;
  total: number;
  osSimplesList: OsSimpleModel[];

  constructor(currentPage: number, perPage: number, total: number, osSimplesList: OsSimpleModel[]) {
    this.currentPage = currentPage;
    this.perPage = perPage;
    this.total = total;
    this.osSimplesList = osSimplesList;
  }

  static fromJson(json: OsPaginatorAPI) {
    return new OsPaginatorModel(
      json.current_page,
      json.per_page,
      json.total,
      json.data.map((os) => OsSimpleModel.fromJson(os))
    );
  }
}

interface OsPaginatorAPI {
  current_page: number;
  per_page: number;
  total: number;
  data: OsSimpleAPI[];
}

type OsPaginatorParams = {
  page: number;
  perPage: number;
}

export { OsPaginatorModel, OsPaginatorAPI, OsPaginatorParams };
