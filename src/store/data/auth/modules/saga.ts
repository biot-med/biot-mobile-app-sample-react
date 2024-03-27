import { all, call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';

import { actions, sagaAuthActionConstants, selectors } from './slice';
import { getUserApi, loginApi, logoutApi, refreshTokenApi, signUpApi, updatePatientApi } from '../../../../@biotmed/api/auth';
import { cleanAuthData, getAuthData, saveAuthData } from '../../../local-storage';
import { AuthDataStore } from '../../../local-storage/interfaces/local-storage-data-model';
import { updateToken } from '../../../../@biotmed/common/Axios';
import { handleAxiosError } from '../../../../@biotmed/common/api-common';
import { searchAttachedDevice, searchDeviceTemplate } from '../../../../@biotmed/api/device';
import { DEFAULT_DEVICE_TEMPLATE_NAME, REGISTRATION_CODE } from '../../../common/constants';
import { actions as SettingsActions } from '../../settings';
import { actions as DeviceActions } from '../../../../screens/search-devices/store/data/devices';
import { routes } from '../../../../navigation/routes';
import { Profile } from '../interfaces/auth-state';

function* loginSaga(action: ReturnType<typeof actions.login>) {
  try {
    const { data } = yield call(loginApi, action.payload.email, action.payload.password);
    const profile: Profile = yield select(selectors.getProfile);
    yield call(saveAuthData, { refreshToken: data.refreshJwt.token });
    yield fork(scheduleTokenRefresh, data.accessJwt.expiration);
    yield call(updateToken, data.accessJwt.token);
    const { data: templateResult } = yield call(searchDeviceTemplate, DEFAULT_DEVICE_TEMPLATE_NAME);
    if (templateResult.data.lenght === 0) {
      throw { response: { status: 404, data: { code: 'app', message: 'env-not-configured' } } }
    }
    const { data: deviceResult } = yield call(searchAttachedDevice, data.userId);
    if (deviceResult.data.lenght === 0) {
      throw { response: { status: 404, data: { code: 'app', message: 'device-not-attached' } } }
    }
    else {
      yield put(DeviceActions.selectDevice({ id: deviceResult.data[0]._id, name: deviceResult.data[0]._caption }));
    }

    if (action.payload.isAfterSignup) {
      yield fork(updatePatientName, data.userId, profile.firstName, profile.lastName);
      yield put(actions.loginSuccess({ userInfo: data }));
    }
    else {
      yield put(actions.loginSuccess({ userInfo: data }));
    }
    yield fork(getUser);
  }
  catch (error: any) {
    const { data } = handleAxiosError(error);
    yield put(actions.loadFailed(data));
  }
}

function* updatePatientName(userId: string, firstName?: string, lastName?: string) {
  try {
    yield call(updatePatientApi, userId, firstName, lastName);
  }
  catch(error: any){}
}

function* signupSaga(action: ReturnType<typeof actions.signup>) {
  try {
    const { data } = yield call(signUpApi, action.payload.username, action.payload.password, REGISTRATION_CODE);
    yield put(SettingsActions.loadSettings());
    yield put(actions.signupSuccess(data));
  }
  catch (error: any) {
    const { data } = handleAxiosError(error);
    yield put(actions.loadFailed(data));
  }
}

function* getUser() {
  try {
    const { data } = yield call(getUserApi);
    yield put(actions.setProfile(data));
  }
  catch (error: any) {
    const { data } = handleAxiosError(error);
    yield put(actions.loadFailed(data));
  }
}

function* authCheck() {
  const authData: AuthDataStore | null = yield call(getAuthData);
  if (authData) {
    try {
      const { data } = yield call(refreshTokenApi, authData.refreshToken);
      yield call(saveAuthData, { refreshToken: data.refreshJwt.token });
      yield fork(scheduleTokenRefresh, data.accessJwt.expiration);
      yield call(updateToken, data.accessJwt.token);
      const { data: templateResult } = yield call(searchDeviceTemplate, DEFAULT_DEVICE_TEMPLATE_NAME);
      if (templateResult.data.lenght === 0) {
        throw { status: 404, data: { code: 'app', message: 'env-not-configured' } }
      }
      const { data: deviceResult } = yield call(searchAttachedDevice, data.userId);
      if (deviceResult.data.lenght === 0) {
        yield put(SettingsActions.loadSettings());
        throw { status: 404, data: { code: 'app', message: 'device-not-attached' } }
      }
      else {
        yield put(DeviceActions.selectDevice({ id: deviceResult.data[0]._id, name: deviceResult.data[0]._caption }));
      }

      yield put(actions.loginSuccess({ userInfo: data }));
      yield fork(getUser);
    }
    catch (error: any) {
      const { data } = handleAxiosError(error);
      yield put(actions.loadFailed(data));
      yield put(actions.logout(authData));
    }
  }
  else {
    yield put(actions.authFailed());
  }
}

function* logoutSaga(action: ReturnType<typeof actions.logout>) {
  try {
    yield call(logoutApi, action.payload.refreshToken);
  }
  catch (error: any) { }
  yield call(cleanAuthData);
  yield call(updateToken, "");
  yield put(SettingsActions.loadSettings());
}

function* scheduleTokenRefresh(expiration: string): any {
  try {
    let tokenTimeLeft = new Date(expiration).getTime() - new Date().getTime() - 60000;
    yield delay(tokenTimeLeft);
    const error = yield call(authCheck);
    if (error) {
      yield put(actions.authFailed())
    }
  } catch (error) {
    return;
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(sagaAuthActionConstants.LOGIN, loginSaga),
    takeLatest(sagaAuthActionConstants.SIGNUP, signupSaga),
    takeLatest(sagaAuthActionConstants.AUTH_CHECK, authCheck),
    takeLatest(sagaAuthActionConstants.LOGOUT, logoutSaga),
  ]);
}
