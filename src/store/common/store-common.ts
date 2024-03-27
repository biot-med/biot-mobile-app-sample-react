import { PayloadAction, createSelector } from '@reduxjs/toolkit';
import { BaseState } from './interfaces/base';
import { BiotError } from '../../@biotmed/common/api-common';
import { RootState } from '../reducer';

export const _startLoading = <T extends BaseState>(state: T) => {
  state.loading = true;
  state.error = null;
};

export const _loadingFailed = <T extends BaseState>(state: T, { payload }: PayloadAction<BiotError>) => {
  state.loading = false;
  state.error = payload;
  state.requestState = 'error';
};
export const _loadingFinish = <T extends BaseState>(state: T) => {
  state.loading = false;
  state.error = null;
};

export const _cleanState = <T extends BaseState>(initState: T) => {
  return initState;
};

export const _success = <T extends BaseState, K>(callback?: Function) => {
  return (state: T, payload: PayloadAction<K>) => {
    state.loading = false;
    state.error = null;
    if (callback) {
      callback(state, payload);
    }
  };
};


export function getBaseStateSelector<T extends BaseState>(stateFetcher: (state: RootState) => T) {
  return {
    isLoading: createSelector(stateFetcher, state => state.loading),
    getError: createSelector(stateFetcher, state => state.error),
    getRequestState: createSelector(stateFetcher, state => state.requestState),
    getOperation: createSelector(stateFetcher, state => state.operation),
  }
}