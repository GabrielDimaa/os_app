import { Component, OnInit } from '@angular/core';
import { SnackbarService } from "./shared/components/snackbar/snackbar.service";
import { SnackbarComponent } from "./shared/components/snackbar/snackbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'link_os';

  constructor(
    private snackbarService: SnackbarService,
    private snackbar: SnackbarComponent
  ) {}

  ngOnInit() {
    this.snackbarService.channel.subscribe((e) => this.snackbar.show(e));
  }
}
