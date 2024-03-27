import { selectors } from './../../../../../store/data/auth/modules/slice';
import reducer, { STATE_NAME, actions } from './slice';
import deviceSaga from "./saga";

export { deviceSaga, reducer, actions, selectors };
export const stateKey = STATE_NAME;