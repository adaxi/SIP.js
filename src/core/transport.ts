import { EventEmitter } from "events";

import { Logger } from "./log";

/**
 * Transport.
 * @remarks
 * Abstract transport layer base class.
 * @public
 */
export abstract class Transport extends EventEmitter {
  public server: any;
  protected logger: Logger;

  /**
   * Constructor
   * @param logger - Logger.
   * @param options - Options bucket.
   */
  constructor(logger: Logger, options: any) {
    super();
    this.logger = logger;
  }

  /**
   * Returns the promise designated by the child layer then emits a connected event.
   * Automatically emits an event upon resolution, unless overrideEvent is set. If you
   * override the event in this fashion, you should emit it in your implementation of connectPromise
   * @param options - Options bucket.
   */
  public connect(options: any = {}): Promise<void> {
    return this.connectPromise(options).then((data: any) => {
      if (!data.overrideEvent) {
        this.emit("connected");
      }
    });
  }

  /**
   * Returns true if the transport is connected
   */
  public abstract isConnected(): boolean;

  /**
   * Sends a message then emits a 'messageSent' event. Automatically emits an
   * event upon resolution, unless data.overrideEvent is set. If you override
   * the event in this fashion, you should emit it in your implementation of sendPromise
   * @param msg - Message.
   * @param options - Options bucket.
   */
  public send(msg: string, options: any = {}): Promise<void> {
    return this.sendPromise(msg).then((data: any) => {
      if (!data.overrideEvent) {
        this.emit("messageSent", data.msg);
      }
    });
  }

  /**
   * Returns the promise designated by the child layer then emits a
   * disconnected event. Automatically emits an event upon resolution,
   * unless overrideEvent is set. If you override the event in this fashion,
   * you should emit it in your implementation of disconnectPromise
   * @param options - Options bucket
   */
  public disconnect(options: any = {}): Promise<void> {
    return this.disconnectPromise(options).then((data: any) => {
      if (!data.overrideEvent) {
        this.emit("disconnected");
      }
    });
  }

  public afterConnected(callback: () => void): void {
    if (this.isConnected()) {
      callback();
    } else {
      this.once("connected", callback);
    }
  }

  /**
   * Returns a promise which resolves once the UA is connected. DEPRECATION WARNING: just use afterConnected()
   */
  public waitForConnected(): Promise<void> {
    // tslint:disable-next-line:no-console
    console.warn("DEPRECATION WARNING Transport.waitForConnected(): use afterConnected() instead");
    return new Promise((resolve) => {
      this.afterConnected(resolve);
    });
  }
  /**
   * Called by connect, must return a promise
   * promise must resolve to an object. object supports 1 parameter: overrideEvent - Boolean
   * @param options - Options bucket.
   */
  protected abstract connectPromise(options: any): Promise<any>;

  /**
   * Called by send, must return a promise
   * promise must resolve to an object. object supports 2 parameters: msg - string (mandatory)
   * and overrideEvent - Boolean (optional)
   * @param msg - Message.
   * @param options - Options bucket.
   */
  protected abstract sendPromise(msg: string, options?: any): Promise<any>;

  /**
   * Called by disconnect, must return a promise
   * promise must resolve to an object. object supports 1 parameter: overrideEvent - Boolean
   * @param options - Options bucket.
   */
  protected abstract disconnectPromise(options: any): Promise<any>;

  /**
   * To be called when a message is received
   * @param e - Event
   */
  protected abstract onMessage(e: any): void;
}
