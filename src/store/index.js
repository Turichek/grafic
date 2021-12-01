import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { graficReducer } from './Grafic/graficReducer';

const rootReducer = combineReducers({
    grafic: graficReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());