import {SupportedComponentsModel} from "../model/supported-components.model";
import {Observable} from "rxjs";

export interface GameDataServiceInterface {

  /**
   * Tells the overlay what this particular service supports on the overlay.
   */
  supports(): SupportedComponentsModel;

  isConnected(): boolean;
}
