import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import HttpErrorException from "../../shared/exceptions/http-error-exception";
import { OsSimpleAPI, OsSimpleModel } from "../models/os-simple.model";

@Injectable({
  providedIn: 'root'
})
export class OsService {
  constructor(private api: ApiHttpClient) {}

  async getAll(): Promise<Array<OsSimpleModel>> {
    try {
      const response = await this.api.get("os");

      const osSimpleList = <Array<OsSimpleModel>>[];

      if (Array.isArray(response) && response.length > 0) {
        for (const obj of response as Array<OsSimpleAPI>) {
          osSimpleList.push(OsSimpleModel.fromJson(obj));
        }
      }

      return osSimpleList;
    } catch (e) {
      if (e instanceof HttpErrorException) {
        throw Error(e.message);
      }

      throw e;
    }
  }
}
