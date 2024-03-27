import reducer, {actions, STATE_NAME, selectors } from './modules/slice';
import settingsSaga from './modules/saga';

export { settingsSaga, reducer, actions, selectors };
export const stateKey = STATE_NAME;
