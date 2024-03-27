import reducer, { STATE_NAME, actions, selectors } from './slice';
import devicesSaga from "./saga";

export { devicesSaga, reducer, actions, selectors };
export const stateKey = STATE_NAME;