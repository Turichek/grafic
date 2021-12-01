import { UPDATE_DATA, UPDATE_GRAFIC, UPDATE_REFAREALEFT, UPDATE_REFAREARIGHT, UPDATE_REFAREAS } from "./constants";

export const updateGraficAction = (payload) => ({ type: UPDATE_GRAFIC, payload });
export const updateRerAreasAction = (payload) => ({ type: UPDATE_REFAREAS, payload });
export const updateRerAreaLeftAction = (payload) => ({ type: UPDATE_REFAREALEFT, payload });
export const updateRerAreaRigthAction = (payload) => ({ type: UPDATE_REFAREARIGHT, payload });
export const updateDataAction = (payload) => ({ type: UPDATE_DATA, payload });