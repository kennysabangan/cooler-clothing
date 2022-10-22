import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'] //Array of strings where we don't want to persist it. userAuth already taken care of by Firebase. Reduce clash between localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

// Second argument is additional initial state values
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);