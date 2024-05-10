import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, map, Observable, switchMap, take, throwError } from "rxjs";
import { KEY_TOKEN } from "../storage/keys/keys";
import { AuthService } from "../../modules/auth/services/auth.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  private _refreshingToken: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.getToken();

    let reqClone = req.clone({
      url: `${environment.apiUrl}/${req.url}`,
      setHeaders: this.setHeaders()
    });

    return next.handle(reqClone)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            if (token) {
              return this.refreshToken()
                .pipe(
                  switchMap(() => {
                    reqClone = reqClone.clone({
                      setHeaders: this.setHeaders()
                    });

                    return next.handle(reqClone);
                  })
              );
            } else {
              this.router.navigate(['auth/login']).then();
            }
          }

          return throwError(err);
        })
      );
  }

  public refreshToken(): Observable<void> {
    if (!this._refreshingToken.value) {
      this._refreshingToken.next(true);

      return this.authService.refreshToken()
        .pipe(
          catchError((err) => throwError(err)),
          finalize(() => this._refreshingToken.next(false))
        );
    } else {
      return this._refreshingToken
        .pipe(
          filter(v => !v.valueOf()),
          map(_ => {}),
          take(1)
        );
    }
  }

  private getToken(): string | null {
    return localStorage.getItem(KEY_TOKEN);
  }

  private setHeaders() {
    const token = this.getToken();

    return {
      secret: "eThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@",
      Authorization: token ? `Bearer ${token}` : ""
    };
  }
}
