import {createFeatureSelector} from "@ngrx/store";
import {SupportedComponentsModel} from "../model/supported-components.model";

export const selectSupportedComponentsFeature = createFeatureSelector<SupportedComponentsModel>('supportedComponents');
