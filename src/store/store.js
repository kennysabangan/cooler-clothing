import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);
// const middleWares = [thunk].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

// Second argument is additional initial state values
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);