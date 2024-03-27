import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _loadingFailed, getBaseStateSelector } from '../../../common/store-common';
import { AuthState, Profile, UserInfo } from '../interfaces/auth-state';
import { LoginForm, RefreshTokenForm, SignUpForm } from '../interfaces/auth-data-model';
import { routes } from '../../../../navigation/routes';
import { BiotError } from '../../../../@biotmed/common/api-common';
import { RootState } from '../../../reducer';

export const STATE_NAME = 'auth';

const initialState: AuthState = {
  userInfo: null,
  profile: null,
  authenticated: false,
  loading: true,
  error: null,
  requestState: 'prepare',
  operation: null,
  initRoute: routes.Loading
};


const _authCheck = (state: AuthState) => {
  state.loading = true;
  state.authenticated = false;
  state.error = null;
  state.requestState = 'start';
  state.operation = 'read';
}

const _startLogin = (state: AuthState, { payload }: PayloadAction<LoginForm>) => {
  state.loading = true;
  state.error = null;
  state.requestState = 'start';
  state.operation = 'read';
}

const _successLogin = (state: AuthState, { payload }: PayloadAction<{ userInfo: UserInfo }>) => {
  state.userInfo = payload.userInfo;
  state.loading = false;
  state.authenticated = true;
  state.requestState = 'finish';
  state.operation = null;
  state.initRoute = routes.Monitoring;
}

const _startSignup = (state: AuthState, { payload }: PayloadAction<SignUpForm>) => {
  state.loading = true;
  state.error = null;
  state.profile = {
    id: '',
    ownerOrganizationId: '',
    username: payload.username,
    firstName: payload.firstName,
    lastName: payload.lastName
  };
  state.requestState = 'start';
  state.operation = 'create';
}

const _successSignup = (state: AuthState) => {
  state.loading = false;
  state.requestState = 'finish';
  state.operation = null;
}

const _setProfile = (state: AuthState, { payload }: PayloadAction<Profile>) => {
  state.profile = payload
}

const _failedLogin = (state: AuthState, { payload }: PayloadAction<{ error: BiotError }>) => {
  state.loading = false;
  state.authenticated = false;
  state.error = payload.error;
  state.requestState = 'error';
  state.operation = null;
  state.initRoute = routes.Login;
}

const _authFailed = (state: AuthState) => {
  state.loading = false;
  state.authenticated = false;
  state.error = null;
  state.requestState = 'prepare';
  state.operation = null;
  state.initRoute = routes.Login;
}

const _cleanAuth = (state: AuthState) => {
  state = { ...initialState };
  state.initRoute = routes.Login;
  return state;
};

const _cleanError = (state: AuthState) => {
  state.loading = false;
  state.error = null;
  state.requestState = 'prepare';
  state.operation = null;
}

const _logout = (state: AuthState, { payload }: PayloadAction<RefreshTokenForm>) => {
  state = { ...initialState };
  state.loading = false;
  state.initRoute = routes.Login;
  return state;
};

const auth = createSlice({
  name: STATE_NAME,
  initialState: initialState,
  reducers: {
    login: _startLogin,
    signup: _startSignup,
    authCheck: _authCheck,
    authFailed: _authFailed,
    loginSuccess: _successLogin,
    signupSuccess: _successSignup,
    setProfile: _setProfile,
    loginFailed: _failedLogin,
    loadFailed: _loadingFailed,
    logout: _logout,
    cleanAuth: _cleanAuth,
    cleanError: _cleanError
  },
});

export const { actions } = auth;

const getState = (state: RootState): AuthState => state[STATE_NAME] || initialState;

export const selectors = {
  ...getBaseStateSelector<AuthState>(getState),
  getUserInfo: createSelector(getState, state => state.userInfo),
  getProfile: createSelector(getState, state => state.profile),
  isAuthenticated: createSelector(getState, state => state.authenticated),
  getInitRoute: createSelector(getState, state => state.initRoute)
}

export const sagaAuthActionConstants = {
  LOGIN: actions.login.type,
  SIGNUP: actions.signup.type,
  LOGOUT: actions.logout.type,
  AUTH_CHECK: actions.authCheck.type
};

const { reducer } = auth;
export default reducer;