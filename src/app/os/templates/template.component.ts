import { Component } from '@angular/core';

@Component({
  selector: 'app-template',
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `
})
export class TemplateComponent {
}
