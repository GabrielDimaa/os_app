import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./guards/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ApiHttpClient } from "./shared/api/api-http-client";
import { ApiHttpInterceptor } from "./shared/api/api-http-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    AuthModule
  ],
  providers: [
    AuthGuard,
    ApiHttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
