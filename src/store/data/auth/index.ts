import reducer, {actions, STATE_NAME, selectors } from './modules/slice';
import authSaga from './modules/saga';

export { authSaga, reducer, actions, selectors };
export const stateKey = STATE_NAME;
