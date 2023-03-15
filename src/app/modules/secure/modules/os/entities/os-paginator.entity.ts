import OsPaginatorModel from "../models/os-paginator.model";
import OsSimpleEntity from "./os-simple.entity";

export default class OsPaginatorEntity {
  constructor(
    public currentPage: number,
    public perPage: number,
    public total: number,
    public osSimplesList: OsSimpleEntity[],
  ) {
  }

  static fromModel(model: OsPaginatorModel) {
    return new OsPaginatorEntity(
      model.current_page,
      model.per_page,
      model.total,
      model.data.map((os) => OsSimpleEntity.fromModel(os))
    );
  }
}
