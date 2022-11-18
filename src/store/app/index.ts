import * as selectors from './selectors';
import { actions, reducer } from './slice';
import * as hooks from './hooks';

export const appSlice = { actions, selectors, reducer, hooks };
