import { combineReducers } from "redux";
import cat, { CatReducerHandler } from "./cat";

export interface AppState {
  cat: CatReducerHandler;
}

const reducers = {
  cat,
};
const combined = combineReducers<AppState>(reducers);
export default combined;
