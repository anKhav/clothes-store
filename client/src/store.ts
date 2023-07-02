import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './features/authSlice';

export type RootState = ReturnType<typeof rootReducer>;
export type AuthState = ReturnType<typeof authReducer>;

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, authReducer)

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