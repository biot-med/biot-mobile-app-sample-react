export interface DebugToolsConfig {
  shouldLog: typeof __DEV__;
  reduxDevTool: typeof __DEV__;
}

export interface AppConfig {
  API_URL?: string;
}
