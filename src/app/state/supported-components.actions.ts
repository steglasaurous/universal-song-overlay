import {createAction, props} from "@ngrx/store";
import {SupportedComponentsModel} from "../model/supported-components.model";

export const updateSupportedComponents = createAction(
  'Update supported actions',
  props<SupportedComponentsModel>()
);
