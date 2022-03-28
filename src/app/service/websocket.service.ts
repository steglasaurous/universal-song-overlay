
import {EMPTY, mergeMap, Observable, Observer, of, retryWhen, Subject, timer} from "rxjs";
import {catchError, multicast, switchAll, tap} from "rxjs/operators";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

export class WebsocketService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(catchError(e => {
    throw e;
  }));
  private websocketUrl: string;
  private connected: boolean = false;

  get isConnected(): boolean {
    return this.connected;
  }

  constructor(host = 'localhost', port = 9000) {
    this.websocketUrl = "ws://" + host + ":" + port;
  }

  public connect(openObserver ?: Observer<any>): void {
    const genericRetryStrategy = ({ retryTime = 5000 }: {
      retryTime?: number
    } = {}) => (attempts: Observable<any>) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          console.log('Failed to connect. Retrying...');
          this.connected = false;
          return timer(retryTime);
        })
      );
    }

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(openObserver);

      this.socket$.pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(error))
      ).subscribe({
        next: (data) => {
          this.messagesSubject$.next(data);
        },
        error: (err) => {
          console.log(err);
          this.connected = false;
        },
        complete: () => {
          console.log('done');
          this.connected = false;
        }
      });
    }
  }

  private getNewWebSocket(openObserver?: Observer<any>): WebSocketSubject<any> {
    return new WebSocketSubject<any>({
      url: this.websocketUrl,
      openObserver: openObserver
      }
    );

    // return webSocket(this.websocketUrl);
  }

  public sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  public close() {
    this.socket$.complete();
  }
}
