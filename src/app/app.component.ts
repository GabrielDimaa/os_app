import { Component, OnInit } from '@angular/core';
import { SnackbarService } from "./shared/components/snackbar/snackbar.service";
import { SnackbarComponent } from "./shared/components/snackbar/snackbar.component";
import { LoadingComponent } from "./shared/components/loading/spinner/loading.component";
import { LoadingService } from "./shared/components/loading/spinner/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'link_os';

  constructor(
    private snackbarService: SnackbarService,
    private snackbar: SnackbarComponent,
    private loadingService: LoadingService,
    private loading: LoadingComponent
  ) {}

  ngOnInit() {
    this.snackbarService.channel.subscribe((e) => this.snackbar.show(e));
    this.loadingService.channel.subscribe((e) => this.loading.event(e));
  }
}
