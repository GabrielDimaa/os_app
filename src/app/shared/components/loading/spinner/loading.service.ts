import { EventEmitter, Injectable } from '@angular/core';
import LoadingStatus from "./loading-status";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public channel: EventEmitter<LoadingStatus> = new EventEmitter<LoadingStatus>();

  public setLoading(visivel: boolean, mensagem: string | null = null): void {
    this.channel.emit({ visivel: visivel, mensagem: mensagem });
  }
}
