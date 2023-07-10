import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './features/auth.slice.ts';
import productsReducer from './features/products.slice.ts';

export type RootState = ReturnType<typeof rootReducer>;
export type AuthState = ReturnType<typeof authReducer>;
export type ProductsState = ReturnType<typeof productsReducer>;

const rootReducer = combineReducers({
    auth: authReducer,
    products:productsReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['products']
};


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store);

export { store, persistor };