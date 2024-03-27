import { configureStore, compose } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';

import RootReducer, { RootState } from './reducer';
import RootSaga, { sagaMiddleware } from './saga';
import DebugConfig from '../config/debugToolsConfig';

function createStore(): any {
	/* ------------- Redux Configuration ------------- */
	const middleware: any[] = [];

	/* ------------- Logger Middleware ------------- */
	const loggerMiddleware = createLogger({
		predicate: (_getState, _action) => DebugConfig.shouldLog,
	});

	// middleware.push(loggerMiddleware);

	/* ------------- Saga Middleware ------------- */
	middleware.push(sagaMiddleware);

	/* ------------- Init Store ------------- */
	const store = configureStore({
		reducer: RootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
		devTools: DebugConfig.reduxDevTool
	});
	sagaMiddleware.run(RootSaga);

	return store;
}

export const store = createStore();

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
