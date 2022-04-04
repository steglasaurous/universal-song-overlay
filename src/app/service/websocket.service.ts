
import {EMPTY, mergeMap, Observable, Observer, of, retryWhen, Subject, throwError, timer} from "rxjs";
import {catchError, multicast, switchAll, tap} from "rxjs/operators";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

export class WebsocketService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(catchError(e => {
    throw e;
  }));

  private connected: boolean = false;

  /**
   * When set to false, further attempts to connect to the websocket will not be made.
   */
  public isRetryEnabled: boolean = true;

  private openObserver: Observer<any> = { next: () => {}, error: (err) => {}, complete: () => {}};
  private closeFunction: Function = () => {};

  get isConnected(): boolean {
    return this.connected;
  }

  constructor(
    private host = 'localhost',
    private port = 9000,
    private path = '') {
  }

  get websocketUrl() {
    return "ws://" + this.host + ":" + this.port + this.path;
  }

  setHost(host: string) {
    this.host = host;
  }

  public connect(openObserver ?: Observer<any>, onClose ?: Function): void {
    // Save open and close for reconnects later.
    if (openObserver) {
      this.openObserver = openObserver;
    }
    if (onClose) {
      this.closeFunction = onClose;
    }

    this.doConnect();
  }

  private doConnect() {
    const genericRetryStrategy = ({ retryTime = 30000 }: { retryTime?: number } = {}) => (attempts: Observable<any>) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          if (this.isRetryEnabled) {
            //console.log('Failed to connect. Retrying...');
            this.connected = false;
            return timer(retryTime);
          }
          // If disabled, stop retrying.
          return throwError(error);
        })
      );
    }

    if (this.socket$ && !this.socket$.closed) {
      // Force the socket to close
      this.socket$.unsubscribe();
    }

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(this.openObserver);

      this.socket$.pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(error))
      ).subscribe({
        next: (data) => {
          this.messagesSubject$.next(data);
        },
        error: (err) => {
          console.log('Got an error');
          console.log(err);
          this.connected = false;
        },
        complete: () => {
          console.log('Connection closed for ' + this.websocketUrl);
        }
      });
    }
  }

  /**
   * If stopped, restart attemping connections to the websocket server.
   */
  public reconnect() {

    this.doConnect();
  }

  private getNewWebSocket(openObserver?: Observer<any>): WebSocketSubject<any> {
    return new WebSocketSubject<any>({
      url: this.websocketUrl,
      openObserver: openObserver,
      closeObserver: {
        next: () => {
          this.connected = false;
          this.closeFunction();
        },
        error: (err) => {
          console.log('Close observer on websocket: ERROR' + this.websocketUrl);
        },
        complete: () => {
          console.log('Close observer on websocket: COMPLETE' + this.websocketUrl);
        }
      }
    });
  }

  public sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  public close() {
    this.socket$.complete();
  }
}
