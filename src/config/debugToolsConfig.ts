import { DebugToolsConfig } from './dataModels';
/**
|--------------------------------------------------
| THE DEBUG CONFIG ARE USED FOR CONFIG TO DEBUG TOOLS.
| DONT PUT HERE CONFIG THAT RELATED DIRECTLY TO YOUR APP
|--------------------------------------------------
*/

const debugToolsConfig: DebugToolsConfig = {
  shouldLog: __DEV__,
  reduxDevTool: __DEV__,
};

export default debugToolsConfig;
