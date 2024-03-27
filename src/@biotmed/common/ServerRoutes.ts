const UMS = {
  login: '/ums/v2/users/login',
  signup: '/api-gateway/v1/sign-up',
  signupAnonymous: '/api-gateway/v1/sign-up/anonymous',
  patientUpdate: '/organization/v1/users/patients/{id}',
  loginWithRefresh: '/ums/v2/users/token/login',
  refreshToken: '/ums/v2/users/token/refresh',
  logout: '/ums/v2/users/logout',
  selfUser: '/ums/v2/users/self'
};

const Device = {
  getDeviceCredentials: '/device/v2/devices/{id}/mqtt-credentials',
  createSession: '/device/v1/devices/{deviceId}/usage-sessions/usage-type/{usageType}',
  updateSession: '/device/v1/devices/{deviceId}/usage-sessions/{id}',
  currentSession: '/device/v1/devices/current/usage-sessions',
  assignDeviceToPatient: '/api-gateway/v1/devices/assign',
  deviceTemplate: '/settings/v1/templates?searchRequest=',
  searchDevice: '/device/v2/devices?searchRequest='
}

const ServerRoutes = {
  UMS,
  Device
};

export default ServerRoutes;
