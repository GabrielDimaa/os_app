import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { KEY_TOKEN } from "../storage/keys/keys";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  private baseUrl: string = "http://localhost:8000/api";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(KEY_TOKEN);

    const reqClone = req.clone({
      url: `${ this.baseUrl }/${ req.url }`,
      setHeaders: {
        secret: "eThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@",
        Authorization: token ? `Bearer ${token}` : ""
      }
    });

    return next.handle(reqClone);
  }
}
