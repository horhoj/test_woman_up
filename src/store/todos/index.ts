import { reducer, actions } from './slice';
import * as selectors from './selectors';
import * as thunks from './thunks';

export const todosSlice = { reducer, actions, thunks, selectors } as const;
